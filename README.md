# OLX Price Prediction

A full-stack machine learning application that estimates used phone and laptop prices from device specifications.

---

## 🎯 Project Overview

OLX Price Prediction helps users estimate resale prices using trained machine learning models and device specifications.

**Live predictions are available for phones and laptops.**

---

## ✨ Features

### Frontend (React + Vite)
- 🎨 **Modern UI** - Built with Material-UI for responsive design
- 📊 **Interactive Prediction Forms** - Validated inputs for phone and laptop specifications
- 📈 **Real-time Results** - Instant price predictions with formatted output
- 🏠 **Landing Page** - Hero section and working category cards
- 📄 **About Page** - Project information and background
- 🚀 **Future-Ready** - Additional device categories are marked as coming soon

### Backend (Flask API)
- 🔌 **RESTful API** - Clean endpoints for predictions
- 🔒 **Configurable CORS** - Allowed frontend origins can be set with `FRONTEND_ORIGINS`
- 📦 **Trained ML Models** - Pre-trained phone and laptop models
- ⚡ **Fast Processing** - Efficient prediction inference

### Machine Learning Pipeline
- 📊 **Data Collection** - Scraped data from OLX with 62 batches of phone listings
- 🧹 **Data Cleaning** - Comprehensive null value handling and outlier removal
- 📈 **Exploratory Data Analysis (EDA)** - Univariate and bivariate analysis
- 🔄 **Feature Engineering** - Data preprocessing and transformation
- 🤖 **Model Selection** - Tested multiple algorithms for optimal performance
- 💾 **Model Persistence** - Joblib serialization for deployment

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.10
- **UI Library**: Material-UI (MUI) 6.1.6
- **Routing**: React Router DOM 6.27.0
- **Styling**: Emotion (CSS-in-JS)
- **Language**: JavaScript (ES Modules)

### Backend
- **Framework**: Flask (Python)
- **Middleware**: Flask-CORS (Cross-Origin Resource Sharing)
- **Data Processing**: Pandas, NumPy
- **Model Serialization**: Joblib
- **Server**: Flask Development Server (Port 5000)

### Machine Learning & Data Science
- **Data Analysis**: Pandas, NumPy
- **Data Visualization**: (Used in Jupyter notebooks)
- **Preprocessing**: Scikit-learn
- **Model Training**: Scikit-learn
- **Notebooks**: Jupyter Notebook
- **Data Format**: CSV

### Development Tools
- **Environment**: Python Virtual Environment (.venv)
- **Version Control**: Git-ready
- **Package Management**: npm (Frontend), pip (Backend)

---

## 📁 Project Structure

```
OLX_Price_Prediction/
│
├── 📂 frontend/                          # React Vite Application
│   │   ├── src/
│   │   │   ├── components/               # Small reusable page, form, and result components
│   │   │   ├── data/                     # Phone, laptop, and category options
│   │   │   ├── pages/                    # Home, About, and prediction routes
│   │   │   ├── utils/                    # API clients and form validation
│   │   │   ├── App.jsx
│   │   │   └── main.jsx
│   │
│   ├── package.json                      # Frontend dependencies
│   ├── vite.config.js                    # Vite configuration
│   └── index.html                        # HTML entry point
│
├── 📂 backend/                           # Flask API and model inference
│   ├── main.py
│   └── test_main.py
│
├── 📂 ML code/                           # Machine Learning Development
│   └── Phone_Code/
│       ├── *.csv                         # Processed datasets at different stages
│       │   ├── basic_processed_data.csv
│       │   ├── clean_after_univariate.csv
│       │   ├── clean_after_bivariate.csv
│       │   ├── Fill_all_Null_value.csv
│       │   ├── Data_Ready_To_preprocess.csv
│       │   └── mobile_data.csv
│       │
│       └── *.ipynb                       # Jupyter Notebooks
│           ├── basic_work_on_data.ipynb        # Initial data exploration
│           ├── univariate_EDA.ipynb            # Single variable analysis
│           ├── Bivariate_EDA.ipynb             # Multi-variable analysis
│           ├── Fill_missing_value.ipynb        # Handle null values
│           ├── Make_data_for_preprocess.ipynb  # Data preparation
│           └── model_selection.ipynb           # Model training & evaluation
│
├── 📂 raw_data/                          # Raw Data
│   ├── olx_mobile_*.csv                  # Raw OLX phone listing data (62 batches)
│   └── scraping_phone.py                 # Web scraping script
│
├── 📂 .venv/                             # Python Virtual Environment
│
└── README.md                             # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** 16+ (for frontend)
- **Python** 3.8+ (for backend & ML)
- **pip** (Python package manager)
- **npm** or **yarn** (Node package manager)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd OLX_Price_Prediction
```

### 2. Set Up Python Virtual Environment
```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate
```

### 3. Install Backend Dependencies
```bash
pip install -r backend/requirements.txt
```

### 4. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 5. Prepare ML Models
Ensure `phone_price_prediction_model_second.pkl` and `laptop_price_prediction_model.pkl` are in `backend/`.

---

## 💻 Running the Project

### Start the Backend (Flask API)

From the project root:
```bash
# Make sure .venv is activated
python backend/main.py
```

Backend will run on: **http://localhost:5000**

The API allows `http://localhost:5173` and `http://127.0.0.1:5173` by default.
Set `FRONTEND_ORIGINS` to a comma-separated origin list when using another
frontend address.

### Start the Frontend (React Vite)

In a new terminal:
```bash
cd frontend
npm run dev
```

Frontend will run on: **http://localhost:5173**

### Access the Application
Open your browser and go to: **http://localhost:5173**

### Run tests

From the project root:
```bash
python -m unittest backend.test_main
cd frontend
npm test
```

---

## 🔌 API Endpoints

### Health check
```
GET /
```
**Response:**
```json
{
  "success": true,
  "message": "OLX Price Prediction API is running",
  "available_routes": ["/api/phone/predict", "/api/predict/laptop"]
}
```

### Predict phone price
```
POST /api/phone/predict
Content-Type: application/json
```

**Request Body:**
```json
{
  "Brand": "samsung",
  "RAM_GB": "8",
  "ROM_GB": "128",
  "Network": "5G",
  "Accessories_Included": 1,
  "Warranty": "Yes"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "predicted_price": 25499.50,
  "lower_bound": 20873.52,
  "upper_bound": 31169.74
}
```

### Predict laptop price
```
POST /api/predict/laptop
Content-Type: application/json
```

The request includes `Brand`, `RAM_GB`, `ROM_GB`, `Screen_Size`, `Storage_Type`,
`Processor`, `Is_Laptop` (0 for desktop or 1 for laptop), and `Warranty_Days`.
Successful responses include `predicted_price`, `lower_bound`, and `upper_bound`.

Invalid JSON and out-of-range or unsupported values return HTTP 400. Model
inference failures return HTTP 500 with a generic error message.

**Error Response:**
```json
{
  "success": false,
  "error": "Select a valid brand."
}
```

---

## 📊 Project Development Process

### Phase 1: Data Collection & Preparation
- **Web Scraping**: Extracted phone listings from OLX in 62 batches
- **Raw Data**: 62 CSV files with phone specifications and prices
- **Files**: `olx_mobile_*.csv` (raw_data folder)
- **Tool**: `scraping_phone.py`

### Phase 2: Data Cleaning
- **Null Value Handling**: `Fill_missing_value.ipynb` → `Fill_all_Null_value.csv`
- **Initial Processing**: `basic_work_on_data.ipynb` → `basic_processed_data.csv`
- **Data Preparation**: `Make_data_for_preprocess.ipynb` → `Data_Ready_To_preprocess.csv`

### Phase 3: Exploratory Data Analysis (EDA)
- **Univariate Analysis**: `univariate_EDA.ipynb`
  - Individual feature distributions
  - Statistical summaries
  - Outlier detection
  - Output: `clean_after_univariate.csv`

- **Bivariate Analysis**: `Bivariate_EDA.ipynb`
  - Relationships between variables
  - Correlation analysis
  - Feature interactions
  - Output: `clean_after_bivariate.csv`

### Phase 4: Feature Engineering & Preprocessing
- Encoding categorical variables (Brand, Network, Warranty)
- Scaling numerical features (RAM, ROM)
- Feature selection and importance analysis
- Log transformation for price target variable

### Phase 5: Model Selection & Training
- **Notebook**: `model_selection.ipynb`
- **Algorithms Tested**:
  - Linear Regression
  - Ridge & Lasso Regression
  - Decision Trees
  - Random Forest
  - Gradient Boosting
- **Best Model**: Selected based on R² score, RMSE, and MAE
- **Serialization**: Model saved as `phone_price_prediction_model.pkl`

### Phase 6: Deployment
- Model loaded in Flask backend
- Frontend communicates via REST API
- Real-time predictions served to users

---

## 📈 Model Features & Inputs

Phone inputs are selected from the supported brand, RAM, storage, and network
options in the frontend. `Accessories_Included` accepts a whole number from 0
to 8, and `Warranty` is `Yes` or `No`. Laptop inputs are limited to the
supported choices and numeric ranges enforced by the API.

Both prediction endpoints return an estimated price and a typical lower/upper
price range in INR.

---

## 🎨 Frontend Architecture

### State Management
- React Hooks (useState) for local state management
- Form state handling with validation
- Prediction result caching

### Component Hierarchy
```
App
├── Navbar
├── Routes
│   ├── Home
│   │   ├── HeroSection
│   │   └── CategorySection
│   │       └── CategoryCard
│   ├── PhonePrediction
│   │   ├── PhonePredictionForm
│   │   └── PredictionPanel
│   ├── LaptopPrediction
│   │   ├── LaptopPredictionForm
│   │   └── LaptopPredictionPanel
│   └── About
└── Footer
```

### Styling
- Material-UI components for consistency
- Emotion CSS-in-JS for custom styling
- Responsive design for mobile/tablet/desktop
- Theme system in `theme.js` for centralized colors and styles

---

## 🔧 Backend Architecture

### Flask Application Flow
```
Request (POST /api/phone/predict or /api/predict/laptop)
    ↓
Request and field validation
    ↓
DataFrame creation in model feature order
    ↓
Model prediction
    ↓
Post-processing (inverse log transformation and price range)
    ↓
JSON response or an explicit HTTP error
```

### Model Loading
```python
phone_model = joblib.load("phone_price_prediction_model_second.pkl")
laptop_model = joblib.load("laptop_price_prediction_model.pkl")
```

---

## 📝 Data Processing Workflow

```
Raw OLX Data (62 CSV files)
    ↓
[basic_work_on_data.ipynb]
    ↓
Basic Processed Data
    ↓
[Fill_missing_value.ipynb]
    ↓
Cleaned Data (Nulls handled)
    ↓
[univariate_EDA.ipynb]
    ↓
Univariate Cleaned Data
    ↓
[Bivariate_EDA.ipynb]
    ↓
Bivariate Cleaned Data
    ↓
[Make_data_for_preprocess.ipynb]
    ↓
ML-Ready Data
    ↓
[model_selection.ipynb]
    ↓
Trained Model (pickle file)
    ↓
Deployment (Flask Backend)
```

---

## 🚀 Future Enhancements

### Short-term
- [ ] Add input validation & sanitization
- [ ] Implement error logging
- [ ] Add loading states and progress indicators
- [ ] API rate limiting & authentication

### Medium-term
- [ ] Laptop price prediction (scaffolding already in place)
- [ ] Add prediction confidence intervals
- [ ] Feature importance visualization
- [ ] Historical price trends dashboard
- [ ] Database integration for prediction history

### Long-term
- [ ] Real-time model retraining pipeline
- [ ] Multi-category prediction (Phones, Laptops, Tablets)
- [ ] User authentication system
- [ ] Mobile app version
- [ ] Advanced analytics dashboard
- [ ] Export predictions to PDF/CSV
- [ ] API documentation (Swagger/OpenAPI)

---

## 🧪 Testing

### Frontend Testing (Recommended Setup)
```bash
# Install testing dependencies
npm install --save-dev vitest @testing-library/react

# Run tests
npm run test
```

### Backend Testing (Recommended Setup)
```bash
# Install testing dependencies
pip install pytest pytest-flask

# Run tests
pytest backend/
```

---

## 📄 File Descriptions

### Key Configuration Files
- **`frontend/vite.config.js`**: Vite bundler configuration
- **`frontend/package.json`**: Frontend dependencies & scripts
- **`frontend/src/theme.js`**: Material-UI theme colors & typography

### Key Data Files
- **`ML code/Phone_Code/*.ipynb`**: Jupyter notebooks with complete analysis
- **`ML code/Phone_Code/*.csv`**: Intermediate processed datasets
- **`raw_data/*.csv`**: Original scraped OLX data
- **`raw_data/scraping_phone.py`**: Web scraping implementation

---

## 🔐 Security Considerations

### Current Implementation
- CORS configured for localhost development
- Input validation on form level
- Error handling with generic messages

### Production Recommendations
- [ ] Implement rate limiting
- [ ] Add API authentication (JWT tokens)
- [ ] Use HTTPS/TLS for data transmission
- [ ] Validate all backend inputs
- [ ] Implement logging and monitoring
- [ ] Use environment variables for secrets
- [ ] Add request payload size limits

---

## 📦 Dependencies Summary

### Frontend Dependencies
```
React 18.3.1
React Router DOM 6.27.0
Material-UI 6.1.6
Emotion (React styling)
Vite 5.4.10
```

### Backend Dependencies
```
Flask (latest stable)
Flask-CORS
Pandas
NumPy
Joblib
Scikit-learn (for model training)
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Troubleshooting

### Common Issues

**1. Model file not found**
```
Error: phone_price_prediction_model.pkl not found
Solution: Ensure the model file is in the backend/ directory
```

**2. CORS errors**
```
Error: Cross-Origin Request Blocked
Solution: Ensure Flask is running and CORS is enabled for localhost:5173
```

**3. Port already in use**
```
Error: Address already in use
Solution: Kill the process using the port or change the port in Flask/Vite config
```

**4. Virtual environment not activated**
```
Error: Command not found
Solution: Run .venv\Scripts\activate (Windows) or source .venv/bin/activate (Mac/Linux)
```

---

## 📖 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Material-UI Docs](https://mui.com)
- [Flask Documentation](https://flask.palletsprojects.com)
- [Scikit-learn Guide](https://scikit-learn.org)
- [Jupyter Notebook](https://jupyter.org)

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Your Name/Organization**

---

## 🙏 Acknowledgments

- OLX for data availability
- React & Flask communities
- Material-UI team for excellent UI components
- Scikit-learn for ML algorithms

---

**Last Updated**: September 2026

**Status**: Active Development ✅

---

*Happy Predicting! 🎯📱💰*
