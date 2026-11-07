import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from '../../../theme.js';

const formatInr = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

const LaptopPriceSummary = ({ result }) => (
  <>
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: tokens.inkNavy,
        backgroundImage: 'linear-gradient(180deg, rgba(20,184,174,0.14), transparent 70%)',
        textAlign: 'center',
      }}
    >
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
        {formatInr(result.predicted_price)}
      </Typography>
    </Box>

    <Box sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: 'background.default', textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        Typical range
      </Typography>
      <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 700 }}>
        {formatInr(result.lower_bound)} – {formatInr(result.upper_bound)}
      </Typography>
    </Box>
  </>
);

export default LaptopPriceSummary;
