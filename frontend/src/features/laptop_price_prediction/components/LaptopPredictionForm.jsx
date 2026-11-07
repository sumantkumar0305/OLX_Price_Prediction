import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';

import { initialLaptopFormState } from '../data/laptopOptions.js';
import { validateLaptopForm } from '../utils/laptopValidation.js';

import LaptopPredictionFields from './LaptopPredictionFields.jsx';
import FormSectionHeading from '../../../components/FormSectionHeading.jsx';
import { tokens } from '../../../theme.js';

const LaptopPredictionForm = ({ onSubmit, isSubmitting }) => {
  const [values, setValues] = useState(initialLaptopFormState);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    const { value } = event.target;

    // Allow only 0 or 1 for isLaptop
    if (
      field === 'isLaptop' &&
      value !== '' &&
      value !== '0' &&
      value !== '1'
    ) {
      return;
    }

    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateLaptopForm(values);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // Convert numeric fields before sending to backend
    const formattedValues = {
      ...values,
      ram: Number(values.ram),
      rom: Number(values.rom),
      screenSize: Number(values.screenSize),
      isLaptop: Number(values.isLaptop),
      warranty: Number(values.warranty),
    };

    onSubmit(formattedValues);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <FormSectionHeading title="Tell us about your laptop" />
      <LaptopPredictionFields
        values={values}
        errors={errors}
        handleChange={handleChange}
      />

      <Stack
        direction="row"
        justifyContent="flex-end"
        sx={{ mt: 4 }}
      >
        <Button
          type="submit"
          size="large"
          variant="contained"
          disabled={isSubmitting}
          startIcon={
            isSubmitting ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <InsightsRoundedIcon />
            )
          }
          sx={{
            bgcolor: tokens.signal,
            color: '#04211F',
            '&:hover': {
              bgcolor: tokens.signalDark,
            },
            px: 4,
            width: {
              xs: '100%',
              sm: 'auto',
            },
          }}
        >
          {isSubmitting ? 'Analyzing…' : 'Predict Price'}
        </Button>
      </Stack>
    </Box>
  );
};

export default LaptopPredictionForm;
