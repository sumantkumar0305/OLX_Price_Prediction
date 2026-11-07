import axios from 'axios';
import { validatePhoneForm } from '../utils/phoneValidation.js';

const PHONE_PREDICT_URL = '/api/phone/predict';
const SERVER_DOWN_MESSAGE =
  'Unable to reach the prediction server. Make sure the Flask backend is running on port 5000.';

export const predictPhonePrice = async (formValues) => {
  const errors = validatePhoneForm(formValues);
  if (Object.keys(errors).length > 0) {
    throw new Error(Object.values(errors)[0]);
  }

  const requestData = {
    Brand: formValues.brand,
    RAM_GB: formValues.ram,
    ROM_GB: formValues.rom,
    Network: formValues.network,
    Accessories_Included: Number(formValues.accessories),
    Warranty: formValues.warranty === 'yes' ? 'Yes' : 'No',
  };

  try {
    const response = await axios.post(PHONE_PREDICT_URL, requestData, {
      headers: { 'Content-Type': 'application/json' },
    });
    const data = response.data;

    if (!data || !data.success) {
      throw new Error(data?.error || 'Prediction API returned an invalid response.');
    }

    const prediction = {
      predicted_price: Number(data.predicted_price),
      lower_bound: Number(data.lower_bound),
      upper_bound: Number(data.upper_bound),
    };

    if (
      Object.values(prediction).some((value) => !Number.isFinite(value) || value < 0) ||
      prediction.lower_bound > prediction.predicted_price ||
      prediction.predicted_price > prediction.upper_bound
    ) {
      throw new Error('Prediction API returned invalid price values.');
    }

    return prediction;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw error;
    }
    if (!error.response) {
      throw new Error(SERVER_DOWN_MESSAGE);
    }
    const message = error.response.data?.error;
    throw new Error(
      typeof message === 'string'
        ? message
        : `Prediction request failed (HTTP ${error.response.status})`
    );
  }
};
