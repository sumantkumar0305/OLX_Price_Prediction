import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RadarRoundedIcon from '@mui/icons-material/RadarRounded';
import MobileNavigation from './MobileNavigation.jsx';
import { tokens } from '../theme.js';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Phone', to: '/predict/phone' },
  { label: 'Laptop', to: '/predict/laptop' },
  { label: 'About', to: '/about' },
];

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'rgba(12,21,36,0.96)',
        borderBottom: `1px solid ${tokens.lineOnDark}`,
        backdropFilter: 'blur(16px)',
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 64, md: 76 }, px: { xs: 2, md: 4 } }}>
        <Stack
          component={RouterLink}
          to="/"
          direction="row"
          alignItems="center"
          spacing={1.2}
          sx={{ textDecoration: 'none', flexGrow: 1 }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '10px',
              display: 'grid',
              placeItems: 'center',
              bgcolor: 'rgba(20, 184, 174, 0.14)',
              border: `1px solid ${tokens.signal}`,
            }}
          >
            <RadarRoundedIcon sx={{ color: tokens.signal, fontSize: 20 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: '#fff',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              fontSize: { xs: '1rem', md: '1.15rem' },
              whiteSpace: 'nowrap',
            }}
          >
            OLX Price Prediction
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          component="nav"
          aria-label="Main navigation"
          sx={{
            display: { xs: 'none', md: 'flex' },
            p: 0.5,
            border: `1px solid ${tokens.lineOnDark}`,
            borderRadius: 3,
            bgcolor: 'rgba(255,255,255,0.035)',
          }}
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Button
                key={link.to}
                component={RouterLink}
                to={link.to}
                sx={{
                  color: isActive ? '#fff' : tokens.slateOnDark,
                  fontWeight: 600,
                  px: 2,
                  bgcolor: isActive ? 'rgba(20,184,174,0.16)' : 'transparent',
                  '&:hover': {
                    color: '#fff',
                    bgcolor: isActive ? 'rgba(20,184,174,0.22)' : 'rgba(255,255,255,0.06)',
                  },
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </Button>
            );
          })}
        </Stack>
        <MobileNavigation
          links={navLinks}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
