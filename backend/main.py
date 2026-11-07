import os

import joblib
import numpy as np
import pandas as pd
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

load_dotenv()

MODEL_DIR = os.path.dirname(os.path.abspath(__file__))

PHONE_BRANDS = {
    "apple",
    "samsung",
    "vivo",
    "realme",
    "oppo",
    "xiaomi",
    "other",
    "motorola",
    "oneplus",
    "infinix",
    "lava",
    "tecno",
    "google",
    "iqoo",
    "poco",
}
PHONE_RAM_OPTIONS = {"4", "6", "8", "12", "16", "other"}
PHONE_ROM_OPTIONS = {"64", "128", "256", "512", "other"}
PHONE_NETWORK_OPTIONS = {"2G", "3G", "4G", "5G"}

LAPTOP_BRANDS = {"macbook", "dell", "others", "lenovo", "hp", "acer", "asus"}
LAPTOP_PROCESSORS = {
    "Apple M1",
    "Apple M2",
    "Apple M3",
    "AMD Ryzen 3",
    "AMD Ryzen 5",
    "AMD Ryzen 7",
    "AMD Ryzen 9",
    "Intel Celeron",
    "Intel Core i3",
    "Intel Core i5",
    "Intel Core i7",
    "Intel Core i9",
    "Intel Core Ultra",
    "Intel Pentium",
    "Intel Xeon",
    "Unspecified",
}
LAPTOP_STORAGE_TYPES = {"SSD", "Unspecified", "HDD", "NVMe"}

app = Flask(__name__)
allowed_origins = [
    origin.strip()
    for origin in os.getenv(
        "FRONTEND_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173"
    ).split(",")
    if origin.strip()
]
CORS(app, origins=allowed_origins)

phone_model = joblib.load(
    os.path.join(MODEL_DIR, "phone_price_prediction_model_second.pkl")
)
laptop_model = joblib.load(
    os.path.join(MODEL_DIR, "laptop_price_prediction_model.pkl")
)

app.logger.info("Phone and laptop models loaded successfully.")


def _error(message, status_code):
    return jsonify({"success": False, "error": message}), status_code


def _get_json_object():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return None, _error("A JSON object is required.", 400)
    return data, None


def _required_fields(data, fields):
    missing = [field for field in fields if field not in data]
    if missing:
        return _error(f"Missing field: {missing[0]}", 400)
    return None


def _choice(data, field, choices, label):
    value = data[field]
    if not isinstance(value, str) or value.strip() not in choices:
        raise ValueError(f"Select a valid {label}.")
    return value.strip()


def _number(data, field, label, minimum, maximum, integer=False):
    value = data[field]
    if isinstance(value, bool):
        raise ValueError(f"{label} must be a number.")

    try:
        number = float(value)
    except (TypeError, ValueError):
        raise ValueError(f"{label} must be a number.") from None

    if not np.isfinite(number):
        raise ValueError(f"{label} must be finite.")
    if integer and not number.is_integer():
        raise ValueError(f"{label} must be a whole number.")
    if number < minimum or number > maximum:
        raise ValueError(f"{label} must be between {minimum} and {maximum}.")
    return int(number) if integer else number


def _model_failure(category):
    app.logger.exception("%s prediction failed", category)
    return _error("The prediction model could not process this request.", 500)


@app.route("/", methods=["GET"])
def home():
    return jsonify(
        {
            "success": True,
            "message": "OLX Price Prediction API is running",
            "available_routes": ["/api/phone/predict", "/api/predict/laptop"],
        }
    )


@app.route("/api/phone/predict", methods=["POST"])
def predict_phone():
    data, error_response = _get_json_object()
    if error_response:
        return error_response

    required_fields = [
        "Brand",
        "RAM_GB",
        "ROM_GB",
        "Network",
        "Accessories_Included",
        "Warranty",
    ]
    error_response = _required_fields(data, required_fields)
    if error_response:
        return error_response

    try:
        brand = _choice(data, "Brand", PHONE_BRANDS, "brand")
        ram = _choice(data, "RAM_GB", PHONE_RAM_OPTIONS, "RAM size")
        rom = _choice(data, "ROM_GB", PHONE_ROM_OPTIONS, "storage size")
        network = _choice(data, "Network", PHONE_NETWORK_OPTIONS, "network type")
        accessories = _number(
            data, "Accessories_Included", "Accessories", 0, 8, integer=True
        )
        warranty = _choice(data, "Warranty", {"Yes", "No"}, "warranty value")
    except ValueError as error:
        return _error(str(error), 400)

    input_data = pd.DataFrame(
        {
            "Brand": [brand],
            "RAM_GB": [ram],
            "ROM_GB": [rom],
            "Network": [network],
            "Accessories_Included": [accessories],
            "Warranty": [warranty],
        }
    )

    try:
        prediction = float(phone_model.predict(input_data)[0])
        price = float(np.exp(prediction))
        lower_bound = float(np.exp(prediction - 0.20))
        upper_bound = float(np.exp(prediction + 0.20))
        if not np.all(np.isfinite([price, lower_bound, upper_bound])):
            raise ValueError("The model returned an invalid price.")
    except Exception:
        return _model_failure("Phone")

    return jsonify(
        {
            "success": True,
            "predicted_price": round(price, 2),
            "lower_bound": round(lower_bound, 2),
            "upper_bound": round(upper_bound, 2),
        }
    )


@app.route("/api/predict/laptop", methods=["POST"])
def predict_laptop():
    data, error_response = _get_json_object()
    if error_response:
        return error_response

    required_fields = [
        "Brand",
        "RAM_GB",
        "ROM_GB",
        "Screen_Size",
        "Storage_Type",
        "Processor",
        "Is_Laptop",
        "Warranty_Days",
    ]
    error_response = _required_fields(data, required_fields)
    if error_response:
        return error_response

    try:
        brand = _choice(data, "Brand", LAPTOP_BRANDS, "brand")
        processor = _choice(data, "Processor", LAPTOP_PROCESSORS, "processor")
        storage_type = _choice(
            data, "Storage_Type", LAPTOP_STORAGE_TYPES, "storage type"
        )
        ram = _number(data, "RAM_GB", "RAM", 2, 128, integer=True)
        rom = _number(data, "ROM_GB", "ROM", 16, 8192, integer=True)
        screen_size = _number(data, "Screen_Size", "Screen size", 10, 40)
        warranty = _number(
            data, "Warranty_Days", "Warranty", 0, 1825, integer=True
        )
        is_laptop = _number(data, "Is_Laptop", "Is_Laptop", 0, 1, integer=True)
    except ValueError as error:
        return _error(str(error), 400)

    input_data = pd.DataFrame(
        {
            "Brand": [brand],
            "RAM_GB": [np.log2(ram)],
            "ROM_GB": [rom],
            "Screen_Size": [screen_size],
            "Storage_Type": [storage_type],
            "Processor": [processor],
            "Warranty_Days": [warranty],
            "Screen_Size_missing": [0],
            "Processor_Tier_missing": [int(processor == "Unspecified")],
            "Is_Laptop": [is_laptop],
        }
    )

    try:
        prediction = float(laptop_model.predict(input_data)[0])
        predicted_price = float(np.exp(prediction))
        lower_bound = float(np.exp(prediction - 0.20))
        upper_bound = float(np.exp(prediction + 0.20))
        if not np.all(np.isfinite([predicted_price, lower_bound, upper_bound])):
            raise ValueError("The model returned an invalid price.")
    except Exception:
        return _model_failure("Laptop")

    return jsonify(
        {
            "success": True,
            "predicted_price": round(predicted_price, 2),
            "lower_bound": round(lower_bound, 2),
            "upper_bound": round(upper_bound, 2),
        }
    )


if __name__ == "__main__":
    app.run(
        debug=os.getenv("FLASK_DEBUG", "false").strip().lower() == "true",
        host=os.getenv("HOST", "127.0.0.1"),
        port=int(os.getenv("PORT", "5000")),
    )
