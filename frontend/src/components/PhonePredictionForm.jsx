import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';

import {
  initialPhoneFormState,
} from '../data/phoneOptions.js';
import PhonePredictionFields from './PhonePredictionFields.jsx';
import { tokens } from '../theme.js';

const PhonePredictionForm = ({ onSubmit, isSubmitting }) => {
  const [values, setValues] = useState(initialPhoneFormState);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    const { value } = event.target;

    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  // Accessories validation: minimum 0 and maximum 8
  const handleAccessoriesChange = (event) => {
    const raw = event.target.value;

    // Allow the field to be empty while typing
    if (raw === '') {
      setValues((prev) => ({
        ...prev,
        accessories: '',
      }));

      return;
    }

    const numeric = Number(raw);

    // Ignore invalid input
    if (Number.isNaN(numeric)) {
      return;
    }

    // Don't allow value greater than 8
    if (numeric > 8) {
      setValues((prev) => ({
        ...prev,
        accessories: 8,
      }));

      setErrors((prev) => ({
        ...prev,
        accessories: undefined,
      }));

      return;
    }

    // Don't allow negative numbers
    const finalValue = Math.max(0, numeric);

    setValues((prev) => ({
      ...prev,
      accessories: finalValue,
    }));

    setErrors((prev) => ({
      ...prev,
      accessories: undefined,
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!values.brand) {
      nextErrors.brand = 'Select a brand';
    }

    if (!values.ram) {
      nextErrors.ram = 'Select RAM';
    }

    if (!values.rom) {
      nextErrors.rom = 'Select storage';
    }

    if (!values.network) {
      nextErrors.network = 'Select network type';
    }

    // Accessories must be between 0 and 8
    if (
      values.accessories === '' ||
      Number(values.accessories) < 0 ||
      Number(values.accessories) > 8
    ) {
      nextErrors.accessories = 'Enter a value between 0 and 8';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      ...values,
      accessories: Number(values.accessories),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <PhonePredictionFields
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleAccessoriesChange={handleAccessoriesChange}
      />
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 4 }}>
        <Button
          type="submit"
          size="large"
          variant="contained"
          disabled={isSubmitting}
          startIcon={<InsightsRoundedIcon />}
          sx={{
            bgcolor: tokens.signal,
            color: '#04211F',
            '&:hover': { bgcolor: tokens.signalDark },
            px: 4,
          }}
        >
          {isSubmitting ? 'Analyzing…' : 'Predict Price'}
        </Button>
      </Stack>
    </Box>
  );
};

export default PhonePredictionForm;