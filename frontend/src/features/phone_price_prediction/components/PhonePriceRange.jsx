import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { tokens } from '../../../theme.js';

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

const PhonePriceRange = ({ lowerBound, upperBound }) => (
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
    <PriceBound label="Lower bound" price={lowerBound} />
    <Typography aria-hidden="true" sx={{ fontSize: '1.8rem', fontWeight: 700, color: tokens.signalDark }}>
      →
    </Typography>
    <PriceBound label="Upper bound" price={upperBound} />
  </Box>
);

const PriceBound = ({ label, price }) => (
  <Stack sx={{ flex: 1, textAlign: 'center' }}>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
      {label}
    </Typography>
    <Typography variant="h5" sx={{ fontWeight: 800, fontSize: { xs: '1.25rem', md: '1.6rem' } }}>
      {formatPrice(price)}
    </Typography>
  </Stack>
);

export default PhonePriceRange;
