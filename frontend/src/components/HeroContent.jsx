import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { tokens } from '../theme.js';

const HeroContent = () => {
  const navigate = useNavigate();

  return (
    <>
      <Chip
        label="SMARTER RESALE STARTS HERE"
        size="small"
        sx={{
          bgcolor: 'rgba(20,184,174,0.14)',
          color: tokens.signal,
          border: '1px solid rgba(20,184,174,0.36)',
          mb: 3,
          fontSize: '0.7rem',
          letterSpacing: '0.06em',
        }}
      />
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '2.6rem', sm: '3.2rem', md: '4.1rem' },
          lineHeight: 1.04,
          mb: 3,
          maxWidth: 620,
        }}
      >
        Know what your used phone is really worth.
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: tokens.slateOnDark,
          maxWidth: 500,
          mb: 4,
          fontSize: { xs: '1rem', md: '1.08rem' },
        }}
      >
        OLX Price Prediction runs your device&apos;s specifications through a trained
        pricing model and returns an instant, data-backed resale estimate &mdash; no
        guesswork, no haggling blind.
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        useFlexGap
        flexWrap="wrap"
        sx={{ '& .MuiButton-root': { minHeight: 50 } }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/predict/phone')}
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{
            bgcolor: tokens.signal,
            color: '#052321',
            '&:hover': { bgcolor: tokens.signalDark },
            fontSize: '1rem',
            boxShadow: '0 10px 24px rgba(20,184,174,0.2)',
          }}
        >
          Predict Phone Price
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/predict/laptop')}
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{
            borderColor: tokens.signal,
            color: tokens.signal,
            '&:hover': { borderColor: tokens.signal, bgcolor: 'rgba(20,184,174,0.1)' },
            fontSize: '1rem',
          }}
        >
          Predict Laptop Price
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/about')}
          sx={{
            borderColor: tokens.lineOnDark,
            color: '#fff',
            '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.06)' },
          }}
        >
          How it works
        </Button>
      </Stack>
    </>
  );
};

export default HeroContent;
