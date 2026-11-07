import { createTheme } from '@mui/material/styles';

// --- Design tokens -----------------------------------------------------
// Subject: a diagnostic / valuation "scanner" for used electronics.
// Palette moves away from the generic cream+terracotta / near-black+neon
// defaults toward a deep instrument-panel navy with a signal-teal accent
// (the "scan" color) and a warm value-gold reserved only for price figures.
export const tokens = {
  inkNavy: '#0C1524',      // primary dark surface (hero, footer)
  inkNavyDeep: '#080D17',  // darkest, for gradients
  paper: '#F4F7F8',        // light page background
  paperRaised: '#FFFFFF',  // card surfaces on light bg
  slate: '#536174',        // secondary text on light
  slateOnDark: '#9AA7B8',  // secondary text on dark
  line: '#E2E8ED',         // hairline borders on light
  lineOnDark: 'rgba(255,255,255,0.12)',
  signal: '#14B8AE',       // scan / accent teal
  signalDark: '#087D75',
  value: '#D6A419',        // value-gold, reserved for price readouts
  danger: '#E15252',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: tokens.signal,
      dark: tokens.signalDark,
      contrastText: '#052321',
    },
    secondary: {
      main: tokens.value,
      contrastText: '#241A02',
    },
    background: {
      default: tokens.paper,
      paper: tokens.paperRaised,
    },
    text: {
      primary: '#101826',
      secondary: tokens.slate,
    },
    divider: tokens.line,
    error: {
      main: tokens.danger,
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    body1: {
      lineHeight: 1.7,
    },
    body2: {
      lineHeight: 1.65,
    },
    h1: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.04em',
    },
    h2: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.015em',
    },
    h3: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
    },
    button: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
    overline: {
      fontFamily: '"JetBrains Mono", monospace',
      letterSpacing: '0.12em',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
              borderRadius: 12,
          paddingInline: 20,
          paddingBlock: 10,
              transition: 'background-color 160ms ease, box-shadow 160ms ease, transform 160ms ease',
              '&:focus-visible': {
                outline: `3px solid ${tokens.signal}`,
                outlineOffset: 3,
              },
            },
          },
        },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          borderColor: tokens.line,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 500,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: tokens.paper,
          backgroundImage:
            'radial-gradient(ellipse at 12% 0%, rgba(20,184,174,0.055), transparent 34rem)',
          minHeight: '100vh',
        },
        '::selection': {
          color: tokens.inkNavy,
          backgroundColor: 'rgba(20,184,174,0.28)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        outlined: {
          borderColor: tokens.line,
          boxShadow: '0 10px 32px rgba(12,21,36,0.035)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: tokens.paperRaised,
          transition: 'box-shadow 160ms ease',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.signalDark,
          },
          '&.Mui-focused': {
            boxShadow: '0 0 0 3px rgba(20,184,174,0.12)',
          },
        },
        notchedOutline: {
          borderColor: tokens.line,
        },
      },
    },
  },
});

export default theme;
