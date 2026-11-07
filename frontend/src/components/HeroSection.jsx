import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LiveScanCard from './LiveScanCard.jsx';
import HeroContent from './HeroContent.jsx';
import { tokens } from '../theme.js';

const HeroSection = () => (
  <Box
    sx={{
      bgcolor: tokens.inkNavy,
      backgroundImage:
        'radial-gradient(ellipse at 82% 12%, rgba(20,184,174,0.2), transparent 42%), linear-gradient(135deg, #0C1524 0%, #101E31 58%, #0C1524 100%)',
      color: '#fff',
      pt: { xs: 7, sm: 9, md: 12 },
      pb: { xs: 8, sm: 10, md: 13 },
      overflow: 'hidden',
    }}
  >
    <Container maxWidth="lg">
      <Grid container spacing={{ xs: 5, md: 7 }} alignItems="center">
        <Grid item xs={12} md={6}>
          <HeroContent />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: 'relative',
              maxWidth: 500,
              mx: 'auto',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: '12% -4%',
                borderRadius: '50%',
                background: 'rgba(20,184,174,0.12)',
                filter: 'blur(55px)',
                pointerEvents: 'none',
              },
            }}
          >
            <LiveScanCard />
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default HeroSection;
