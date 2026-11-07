import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import { initialPhoneFormState } from '../data/phoneOptions.js';
import { validatePhoneForm } from '../utils/phoneValidation.js';
import PhonePredictionFields from './PhonePredictionFields.jsx';
import FormSectionHeading from '../../../components/FormSectionHeading.jsx';
import { tokens } from '../../../theme.js';

const PhonePredictionForm = ({ onSubmit, isSubmitting }) => {
  const [values, setValues] = useState(initialPhoneFormState);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validatePhoneForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit({ ...values, accessories: Number(values.accessories) });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <FormSectionHeading title="Tell us about your phone" />
      <PhonePredictionFields
        values={values}
        errors={errors}
        handleChange={handleChange}
      />
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 4 }}>
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
            '&:hover': { bgcolor: tokens.signalDark },
            px: 4,
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          {isSubmitting ? 'Analyzing…' : 'Predict Price'}
        </Button>
      </Stack>
    </Box>
  );
};

export default PhonePredictionForm;
