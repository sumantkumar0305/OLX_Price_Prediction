import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LaptopPriceSummary from './LaptopPriceSummary.jsx';
import LaptopPredictionSpecifications from './LaptopPredictionSpecifications.jsx';
import { tokens } from '../../../theme.js';

const panelSx = {
  p: { xs: 3, md: 4 },
  borderColor: tokens.line,
  borderRadius: 3,
  height: '100%',
  minHeight: 350,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const LaptopPredictionPanel = ({ isLoading, error, result, submittedValues }) => {
  if (isLoading) {
    return (
      <Paper variant="outlined" role="status" aria-live="polite" sx={{ ...panelSx, alignItems: 'center', textAlign: 'center' }}>
        <CircularProgress sx={{ color: tokens.signal, mb: 2 }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Analyzing your laptop…
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Running the specifications through the pricing model.
        </Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper variant="outlined" role="alert" sx={{ ...panelSx, borderColor: tokens.danger }}>
        <Alert severity="error" variant="outlined">
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Couldn&apos;t get a prediction
          </Typography>
          <Typography variant="body2">{error}</Typography>
        </Alert>
      </Paper>
    );
  }

  if (!result) {
    return (
      <Paper
        variant="outlined"
        sx={{
          ...panelSx,
          borderStyle: 'dashed',
          alignItems: 'center',
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 700, color: 'text.primary' }}>
          Your Prediction
        </Typography>
        <Typography variant="body2">
          Your estimated price will appear here once you submit the laptop details.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper variant="outlined" role="status" aria-live="polite" sx={panelSx}>
      <Stack spacing={0.5} sx={{ mb: 3 }}>
        <Typography
          variant="overline"
          sx={{ fontWeight: 700, letterSpacing: '0.12em', color: tokens.signalDark }}
        >
          PREDICTION RESULT
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Estimated Laptop Price
        </Typography>
      </Stack>
      <LaptopPriceSummary result={result} />
      <LaptopPredictionSpecifications values={submittedValues} />
    </Paper>
  );
};

export default LaptopPredictionPanel;
