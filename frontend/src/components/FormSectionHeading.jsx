import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { tokens } from '../theme.js';

const FormSectionHeading = ({ title }) => (
  <Stack
    direction={{ xs: 'column', sm: 'row' }}
    justifyContent="space-between"
    alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
    spacing={1}
    sx={{ mb: 3, pb: 2.5, borderBottom: `1px solid ${tokens.line}` }}
  >
    <Box>
      <Typography
        variant="overline"
        sx={{ display: 'block', color: tokens.signalDark, fontSize: '0.65rem' }}
      >
        DEVICE DETAILS
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
    </Box>
    <Typography variant="caption" color="text.secondary">
      A few details, one estimate
    </Typography>
  </Stack>
);

export default FormSectionHeading;
