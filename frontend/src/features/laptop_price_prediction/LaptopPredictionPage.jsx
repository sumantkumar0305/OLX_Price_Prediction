import { useState } from 'react';

import LaptopPredictionForm from './components/LaptopPredictionForm.jsx';
import LaptopPredictionPanel from './components/LaptopPredictionPanel.jsx';
import { predictLaptopPrice } from './services/laptopPrediction.js';
import PredictionPageLayout from '../../components/PredictionPageLayout.jsx';

const LaptopPrediction = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [submittedValues, setSubmittedValues] = useState(null);

  const handleSubmit = async (formValues) => {
    setIsSubmitting(true);
    setResult(null);
    setError(null);

    try {
      const prediction = await predictLaptopPrice(formValues);
      setResult(prediction);
      setSubmittedValues(formValues);
    } catch (err) {
      console.error('Laptop prediction error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PredictionPageLayout
      eyebrow="LAPTOP PRICE PREDICTOR"
      title="Estimate your used laptop's resale price"
      description="Enter your laptop's key specifications to see a reliable, model-based resale estimate."
      form={<LaptopPredictionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />}
      panel={
        <LaptopPredictionPanel
          isLoading={isSubmitting}
          error={error}
          result={result}
          submittedValues={submittedValues}
        />
      }
    />
  );
};

export default LaptopPrediction;
