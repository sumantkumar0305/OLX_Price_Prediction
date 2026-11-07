import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import { tokens } from '../theme.js';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: tokens.inkNavy,
        borderTop: `1px solid ${tokens.lineOnDark}`,
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
        >
          <Stack spacing={0.5}>
            <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700 }}>
              OLX Price Prediction
            </Typography>
            <Typography variant="body2" sx={{ color: tokens.slateOnDark }}>
              &copy; {new Date().getFullYear()} &mdash; Data-backed resale estimates for your devices.
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
            <Typography
              variant="overline"
              sx={{ color: tokens.slateOnDark, fontSize: '0.65rem', mr: 1 }}
            >
              PHONE · LAPTOP · LIVE
            </Typography>
            <Button
              component="a"
              href="#root"
              size="small"
              endIcon={<ArrowUpwardRoundedIcon />}
              sx={{
                color: tokens.slateOnDark,
                '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.07)' },
              }}
            >
              Back to top
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
