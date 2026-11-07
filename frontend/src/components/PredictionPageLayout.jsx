import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { tokens } from '../theme.js';

const PredictionPageLayout = ({ eyebrow, title, description, form, panel }) => (
  <Box
    component="section"
    sx={{
      py: { xs: 5, sm: 7, md: 9 },
      backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.65), transparent 28rem)',
    }}
  >
    <Container maxWidth="lg">
      <Stack spacing={1.5} sx={{ mb: { xs: 4, md: 5 }, maxWidth: 700 }}>
        <Chip
          label={eyebrow}
          size="small"
          sx={{
            alignSelf: 'flex-start',
            bgcolor: 'rgba(20,184,174,0.1)',
            color: tokens.signalDark,
            fontSize: '0.68rem',
            letterSpacing: '0.04em',
          }}
        />
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            lineHeight: 1.12,
            maxWidth: 680,
          }}
        >
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
          {description}
        </Typography>
      </Stack>

      <Grid container spacing={{ xs: 2.5, md: 3 }} alignItems="stretch">
        <Grid item xs={12} md={7}>
          <Paper
            variant="outlined"
            sx={{
              p: { xs: 2.5, sm: 3.5, md: 4 },
              height: '100%',
              backgroundImage: 'linear-gradient(145deg, #fff, rgba(255,255,255,0.88))',
            }}
          >
            {form}
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          {panel}
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default PredictionPageLayout;
