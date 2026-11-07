export const predictPhonePrice = async (formValues) => {
  const ram = String(formValues.ram ?? '').trim();
  const rom = String(formValues.rom ?? '').trim();
  const accessories = Number(formValues.accessories ?? 0);

  if (!ram || !rom || !Number.isFinite(accessories)) {
    throw new Error('RAM, storage, and accessories must be valid values');
  }

  const requestData = {
    Brand: formValues.brand,
    RAM_GB: ram,
    ROM_GB: rom,
    Network: formValues.network,
    Accessories_Included: accessories,
    Warranty: formValues.warranty === 'yes' ? 'Yes' : 'No',
  };

  console.log("Data being sent to Flask:", requestData);

  try {
    const response = await fetch('/api/predict', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(requestData),
    });

    const responseText = await response.text();
    let data;

    try {
      data = responseText ? JSON.parse(responseText) : null;
    } catch {
      throw new Error(`Prediction API returned invalid JSON (HTTP ${response.status})`);
    }

    if (!response.ok || !data?.success) {
      throw new Error(data?.error || `Prediction request failed (HTTP ${response.status})`);
    }

    // Return all prediction values
    return {
      // predicted_price: Number(data.predicted_price),
      lower_bound: Number(data.lower_bound),
      upper_bound: Number(data.upper_bound),
    };

  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};