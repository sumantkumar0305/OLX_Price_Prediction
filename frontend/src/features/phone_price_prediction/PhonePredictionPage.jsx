import { useState } from 'react';

import PhonePredictionForm from './components/PhonePredictionForm.jsx';
import PhonePredictionPanel from './components/PhonePredictionPanel.jsx';
import { predictPhonePrice } from './services/phonePrediction.js';
import PredictionPageLayout from '../../components/PredictionPageLayout.jsx';

const PhonePrediction = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [submittedValues, setSubmittedValues] = useState(null);

  const handleSubmit = async (formValues) => {
    setIsSubmitting(true);
    setResult(null);
    setError(null);

    try {
      const prediction = await predictPhonePrice(formValues);
      setResult(prediction);
      setSubmittedValues(formValues);
    } catch (requestError) {
      console.error('Phone prediction failed:', requestError);
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PredictionPageLayout
      eyebrow="MOBILE PHONE PREDICTOR"
      title="Estimate your used phone's resale price"
      description="Share a few details about your phone to get a fast, data-backed resale estimate."
      form={<PhonePredictionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />}
      panel={
        <PhonePredictionPanel
          isLoading={isSubmitting}
          error={error}
          result={result}
          submittedValues={submittedValues}
        />
      }
    />
  );
};

export default PhonePrediction;
