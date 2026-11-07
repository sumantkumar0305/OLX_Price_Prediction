import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from '../../../theme.js';

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

const PhonePriceSummary = ({ price }) => (
  <Box sx={{ p: 3, borderRadius: 3, bgcolor: tokens.inkNavy, textAlign: 'center' }}>
    <Typography variant="caption" sx={{ color: tokens.slateOnDark, letterSpacing: '0.08em' }}>
      EXPECTED RESALE VALUE
    </Typography>
    <Typography
      data-testid="predicted-price"
      sx={{
        fontFamily: '"JetBrains Mono", monospace',
        fontWeight: 700,
        fontSize: { xs: '2.2rem', md: '2.8rem' },
        color: tokens.value,
        lineHeight: 1.1,
        mt: 0.5,
        wordBreak: 'break-word',
      }}
    >
      {formatPrice(price)}
    </Typography>
  </Box>
);

export default PhonePriceSummary;
