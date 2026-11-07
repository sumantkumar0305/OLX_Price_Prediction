import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { tokens } from '../theme.js';

const SCAN_LINES = [
  { label: 'BRAND', value: 'SAMSUNG GALAXY S21' },
  { label: 'RAM / ROM', value: '8GB / 128GB' },
  { label: 'NETWORK', value: '5G' },
  { label: 'CONDITION', value: 'GOOD, WARRANTY: NO' },
  { label: 'EST. VALUE', value: '₹ 24,500', isResult: true },
];

const LiveScanCard = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const delay = visibleCount >= SCAN_LINES.length ? 2400 : 650;
    const timer = setTimeout(
      () => setVisibleCount((count) => (count >= SCAN_LINES.length ? 0 : count + 1)),
      delay
    );
    return () => clearTimeout(timer);
  }, [visibleCount]);

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'relative',
        border: '1px solid rgba(255,255,255,0.13)',
        borderRadius: 4,
        bgcolor: 'rgba(255,255,255,0.055)',
        boxShadow: '0 24px 70px rgba(0,0,0,0.24)',
        backdropFilter: 'blur(16px)',
        p: { xs: 3, sm: 4 },
        fontFamily: '"JetBrains Mono", monospace',
        maxWidth: 440,
        mx: { xs: 'auto', md: 0 },
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${tokens.signal}, transparent)`,
          opacity: 0.8,
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
        <Typography variant="overline" sx={{ color: tokens.slateOnDark, fontSize: '0.68rem' }}>
          LIVE_SCAN.LOG
        </Typography>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: tokens.signal,
            boxShadow: `0 0 8px ${tokens.signal}`,
          }}
        />
      </Stack>

      <Stack spacing={1.4} sx={{ minHeight: 190 }}>
        {SCAN_LINES.map((line, index) => {
          const isVisible = index < visibleCount;
          return (
            <Stack
              key={line.label}
              direction="row"
              justifyContent="space-between"
              sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-6px)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
                borderTop: line.isResult ? `1px dashed ${tokens.lineOnDark}` : 'none',
                pt: line.isResult ? 1.4 : 0,
              }}
            >
              <Typography variant="caption" sx={{ color: tokens.slateOnDark, fontSize: '0.75rem' }}>
                {line.label}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: line.isResult ? tokens.value : '#fff',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                }}
              >
                {line.value}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
};

export default LiveScanCard;
