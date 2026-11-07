import { useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import PhonePredictionForm from '../components/PhonePredictionForm.jsx';
import PredictionPanel from '../components/PredictionPanel.jsx';
import { predictPhonePrice } from '../utils/mockPrediction.js';
import { tokens } from '../theme.js';

const PhonePrediction = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lowerPrice, setLowerPrice] = useState(null);
  const [upperPrice, setUpperPrice] = useState(null);
  const [submittedValues, setSubmittedValues] = useState(null);

  const handleSubmit = async (formValues) => {
    setIsSubmitting(true);
    setLowerPrice(null);
    setUpperPrice(null);

    try {
      const prediction = await predictPhonePrice(formValues);
      setLowerPrice(prediction.lower_bound);
      setUpperPrice(prediction.upper_bound);
      setSubmittedValues(formValues);
    } catch (error) {
      console.error('Prediction error:', error);
      setLowerPrice(null);
      setUpperPrice(null);
      alert('Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', py: { xs: 6, md: 9 } }}>
      <Container maxWidth="lg">
        <Stack spacing={1} sx={{ mb: 5, maxWidth: 640 }}>
          <Chip
            label="MOBILE PHONE PREDICTOR"
            size="small"
            sx={{
              alignSelf: 'flex-start',
              bgcolor: 'rgba(20,184,174,0.1)',
              color: tokens.signalDark,
              fontSize: '0.68rem',
            }}
          />
          <Typography variant="h3" sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
            Estimate your used phone's resale price
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Fill in the device details below. The estimate updates instantly using the trained pricing model.
          </Typography>
        </Stack>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Paper
              variant="outlined"
              sx={{ p: { xs: 3, md: 4 }, borderColor: tokens.line, borderRadius: 3 }}
            >
              <PhonePredictionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <PredictionPanel
              lowerPrice={lowerPrice}
              upperPrice={upperPrice}
              submittedValues={submittedValues}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PhonePrediction;
