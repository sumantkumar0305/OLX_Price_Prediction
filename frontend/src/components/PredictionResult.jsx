import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { tokens } from '../theme.js';

const formatInr = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

const PredictionResult = ({ price, formValues }) => {
  if (price === null || price === undefined) return null;

  return (
    <Grow in={Boolean(price)} timeout={500}>
      <Box
        sx={{
          bgcolor: tokens.inkNavy,
          color: '#fff',
          borderRadius: 3,
          border: `1px solid ${tokens.lineOnDark}`,
          p: { xs: 3, md: 4 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(180deg, rgba(20,184,174,0.14), transparent 60%)`,
            pointerEvents: 'none',
          }}
        />

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <CheckCircleRoundedIcon sx={{ color: tokens.signal, fontSize: 20 }} />
          <Typography
            variant="overline"
            sx={{ color: tokens.slateOnDark, fontSize: '0.7rem' }}
          >
            ESTIMATED USED PHONE PRICE
          </Typography>
        </Stack>

        <Typography
          sx={{
            fontFamily: '"JetBrains Mono", monospace',
            fontWeight: 700,
            fontSize: { xs: '2.6rem', md: '3.2rem' },
            color: tokens.value,
            lineHeight: 1,
            mb: 3,
          }}
        >
          {formatInr(price)}
        </Typography>

        {formValues && (
          <>
            <Divider sx={{ borderColor: tokens.lineOnDark, mb: 2 }} />
            <Stack
              direction="row"
              flexWrap="wrap"
              rowGap={1}
              columnGap={3}
              sx={{ mb: 3, fontFamily: '"JetBrains Mono", monospace' }}
            >
              {[
                ['BRAND', formValues.brand],
                ['RAM', `${formValues.ram}GB`],
                ['ROM', `${formValues.rom}GB`],
                ['NETWORK', formValues.network],
                ['ACCESSORIES', formValues.accessories],
                ['WARRANTY', formValues.warranty === 'yes' ? 'YES' : 'NO'],
              ].map(([label, value]) => (
                <Stack key={label} spacing={0.2}>
                  <Typography sx={{ fontSize: '0.65rem', color: tokens.slateOnDark }}>
                    {label}
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 600 }}>
                    {String(value)}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </>
        )}

        <Typography variant="caption" sx={{ color: tokens.slateOnDark, display: 'block' }}>
          This is an estimated price based on the available phone
          specifications. Actual resale value may vary with real-world
          condition and market demand.
        </Typography>
      </Box>
    </Grow>
  );
};

export default PredictionResult;
