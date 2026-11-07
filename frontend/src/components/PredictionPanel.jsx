import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { tokens } from '../theme.js';

const formatPrice = (price) => {
  if (price === null || price === undefined) {
    return '₹0';
  }

  return `₹${Number(price).toLocaleString('en-IN', {
    maximumFractionDigits: 0,
  })}`;
};

const PredictionPanel = ({ lowerPrice, upperPrice, submittedValues }) => {
  if (lowerPrice === null || upperPrice === null) {
    return (
      <Paper
        variant="outlined"
        sx={{
          p: 4,
          borderColor: tokens.line,
          borderStyle: 'dashed',
          borderRadius: 3,
          height: '100%',
          minHeight: 350,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 700, color: 'text.primary' }}>
          Your Prediction
        </Typography>
        <Typography variant="body2">
          Your estimated price range will appear here once you submit the phone details.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 3, md: 4 },
        borderColor: tokens.line,
        borderRadius: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Stack spacing={0.5} sx={{ mb: 4 }}>
        <Typography
          variant="overline"
          sx={{ fontWeight: 700, letterSpacing: '0.12em', color: tokens.signalDark }}
        >
          PREDICTION RESULT
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Estimated Price Range
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Based on the phone details you provided.
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          p: 3,
          borderRadius: 3,
          bgcolor: 'rgba(20,184,174,0.06)',
          border: '1px solid rgba(20,184,174,0.18)',
        }}
      >
        <PriceBound label="Lower Bound" price={lowerPrice} />
        <Typography sx={{ fontSize: '1.8rem', fontWeight: 700, color: tokens.signalDark }}>
          →
        </Typography>
        <PriceBound label="Upper Bound" price={upperPrice} />
      </Box>

      <Box sx={{ mt: 3, p: 2, borderRadius: 2, bgcolor: 'background.default', textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Expected resale value
        </Typography>
        <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 700 }}>
          {formatPrice(lowerPrice)} – {formatPrice(upperPrice)}
        </Typography>
      </Box>

      {submittedValues && (
        <Stack spacing={0.5} sx={{ mt: 3, pt: 3, borderTop: `1px solid ${tokens.line}` }}>
          <Typography variant="caption" color="text.secondary">
            Prediction generated for
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {submittedValues.brand} • {submittedValues.ram}GB RAM • {submittedValues.rom}GB Storage
          </Typography>
        </Stack>
      )}
    </Paper>
  );
};

const PriceBound = ({ label, price }) => (
  <Box sx={{ flex: 1, textAlign: 'center' }}>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
      {label}
    </Typography>
    <Typography
      variant="h4"
      sx={{ fontWeight: 800, fontSize: { xs: '1.5rem', md: '1.8rem' } }}
    >
      {formatPrice(price)}
    </Typography>
  </Box>
);

export default PredictionPanel;
