import unittest
from unittest.mock import patch

import numpy as np

from backend import main


class FixedModel:
    def __init__(self, value=10.0, fail=False):
        self.value = value
        self.fail = fail
        self.input = None

    def predict(self, values):
        if self.fail:
            raise RuntimeError("model unavailable")
        self.input = values.copy()
        return np.array([self.value])


class PredictionApiTests(unittest.TestCase):
    def setUp(self):
        self.client = main.app.test_client()

    def test_phone_prediction_returns_point_and_range(self):
        model = FixedModel()
        with patch.object(main, "phone_model", model):
            response = self.client.post(
                "/api/phone/predict",
                json={
                    "Brand": "apple",
                    "RAM_GB": "8",
                    "ROM_GB": "128",
                    "Network": "5G",
                    "Accessories_Included": 2,
                    "Warranty": "Yes",
                },
            )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(set(response.json), {
            "success",
            "predicted_price",
            "lower_bound",
            "upper_bound",
        })
        self.assertLess(response.json["lower_bound"], response.json["predicted_price"])
        self.assertLess(response.json["predicted_price"], response.json["upper_bound"])
        self.assertEqual(model.input.loc[0, "Accessories_Included"], 2)

    def test_phone_rejects_fractional_accessory_count(self):
        response = self.client.post(
            "/api/phone/predict",
            json={
                "Brand": "apple",
                "RAM_GB": "8",
                "ROM_GB": "128",
                "Network": "5G",
                "Accessories_Included": 1.5,
                "Warranty": "Yes",
            },
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("whole number", response.json["error"])

    def test_laptop_prediction_uses_expected_features(self):
        model = FixedModel()
        with patch.object(main, "laptop_model", model):
            response = self.client.post(
                "/api/predict/laptop",
                json={
                    "Brand": "dell",
                    "RAM_GB": 8,
                    "ROM_GB": 256,
                    "Screen_Size": 15.6,
                    "Storage_Type": "SSD",
                    "Processor": "Intel Core i5",
                    "Is_Laptop": 1,
                    "Warranty_Days": 0,
                },
            )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            list(model.input.columns),
            [
                "Brand",
                "RAM_GB",
                "ROM_GB",
                "Screen_Size",
                "Storage_Type",
                "Processor",
                "Warranty_Days",
                "Screen_Size_missing",
                "Processor_Tier_missing",
                "Is_Laptop",
            ],
        )
        self.assertEqual(model.input.loc[0, "RAM_GB"], 3)

    def test_model_failure_returns_server_error(self):
        with patch.object(main, "phone_model", FixedModel(fail=True)):
            response = self.client.post(
                "/api/phone/predict",
                json={
                    "Brand": "apple",
                    "RAM_GB": "8",
                    "ROM_GB": "128",
                    "Network": "5G",
                    "Accessories_Included": 0,
                    "Warranty": "No",
                },
            )

        self.assertEqual(response.status_code, 500)
        self.assertEqual(
            response.json["error"],
            "The prediction model could not process this request.",
        )


if __name__ == "__main__":
    unittest.main()
