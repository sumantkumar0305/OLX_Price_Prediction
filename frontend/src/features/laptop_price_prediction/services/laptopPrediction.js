import axios from 'axios';

const LAPTOP_PREDICT_URL = '/api/predict/laptop';
const SERVER_DOWN_MESSAGE =
  'Unable to reach the prediction server. Make sure the Flask backend is running on port 5000.';

export const predictLaptopPrice = async (formValues) => {
  const requestData = {
    Brand: formValues.brand,
    RAM_GB: Number(formValues.ram),
    ROM_GB: Number(formValues.rom),
    Screen_Size: Number(formValues.screenSize),
    Storage_Type: formValues.storageType,
    Processor: formValues.processor,
    Is_Laptop: Number(formValues.isLaptop),
    Warranty_Days: Number(formValues.warranty),
  };

  try {
    const response = await axios.post(LAPTOP_PREDICT_URL, requestData, {
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
      throw new Error('Prediction API returned an invalid price.');
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
