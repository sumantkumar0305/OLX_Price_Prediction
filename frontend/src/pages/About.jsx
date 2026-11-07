import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import { tokens } from '../theme.js';

const points = [
  {
    icon: ScienceRoundedIcon,
    title: 'Data Science & ML at the core',
    body:
      'Every estimate comes from a model trained on real used-device listings, learning how brand, specifications and condition combine to determine resale value.',
  },
  {
    icon: SmartphoneRoundedIcon,
    title: 'Mobile phones and laptops, live today',
    body:
      'The phone and laptop pricing models are fully trained and connected to this interface. Enter your device details and get an instant valuation.',
  },
  {
    icon: RocketLaunchRoundedIcon,
    title: 'More categories, coming next',
    body:
      'Smartwatches and other electronics are on the roadmap. The platform is built so each new category plugs into the same interface once its model is ready.',
  },
];

const About = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 9 } }}>
      <Container maxWidth="lg">
        <Stack spacing={2} sx={{ mb: { xs: 4, md: 6 }, maxWidth: 760 }}>
          <Chip
            label="BUILT AROUND BETTER RESALE DECISIONS"
            size="small"
            sx={{
              alignSelf: 'flex-start',
              bgcolor: 'rgba(20,184,174,0.1)',
              color: tokens.signalDark,
              letterSpacing: '0.04em',
            }}
          />
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, lineHeight: 1.12 }}
          >
            An AI-powered valuation tool for used electronics
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680 }}>
            OLX Price Prediction estimates the resale price of used devices using a
            machine learning model trained on real listing data, starting
            with mobile phones and laptops.
          </Typography>
        </Stack>

        <Grid container spacing={2.5}>
          {points.map(({ icon: Icon, title, body }, index) => (
            <Grid item xs={12} md={4} key={title}>
              <Paper
                variant="outlined"
                sx={{
                  p: { xs: 2.5, md: 3 },
                  height: '100%',
                  backgroundImage: 'linear-gradient(145deg, #fff, rgba(247,252,251,0.9))',
                }}
              >
                <Stack spacing={2.5} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      flexShrink: 0,
                      borderRadius: '15px',
                      display: 'grid',
                      placeItems: 'center',
                      bgcolor: index === 1 ? 'rgba(20,184,174,0.12)' : 'rgba(12,21,36,0.05)',
                      border: `1px solid ${index === 1 ? 'rgba(20,184,174,0.32)' : tokens.line}`,
                    }}
                  >
                    <Icon sx={{ color: index === 1 ? tokens.signalDark : tokens.inkNavy }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {body}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
