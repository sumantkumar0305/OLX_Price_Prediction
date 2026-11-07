import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import { tokens } from '../theme.js';

const CategoryCard = ({ category, onSelect }) => {
  const { label, tagline, description, icon: Icon, status } = category;
  const isActive = status === 'active';

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        borderColor: isActive ? 'rgba(20,184,174,0.2)' : tokens.line,
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: isActive
          ? 'linear-gradient(145deg, #fff, rgba(247,252,251,0.92))'
          : 'none',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          borderColor: isActive ? tokens.signal : tokens.line,
          boxShadow: isActive
            ? '0 12px 28px rgba(20,184,174,0.16)'
            : '0 12px 24px rgba(15,23,42,0.08)',
        },
        '&:focus-within': {
          borderColor: tokens.signal,
          boxShadow: '0 0 0 3px rgba(20,184,174,0.12)',
        },
      }}
    >
      <CardActionArea
        onClick={() => onSelect(category)}
        sx={{ height: '100%', p: 3, display: 'flex', alignItems: 'stretch' }}
      >
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                display: 'grid',
                placeItems: 'center',
                bgcolor: isActive ? 'rgba(20,184,174,0.12)' : 'rgba(15,23,42,0.05)',
                border: `1px solid ${isActive ? tokens.signal : tokens.line}`,
              }}
            >
              <Icon sx={{ color: isActive ? tokens.signal : tokens.slate, fontSize: 24 }} />
            </Box>
            <Chip
              label={isActive ? 'LIVE' : 'SOON'}
              size="small"
              sx={{
                bgcolor: isActive ? 'rgba(20,184,174,0.12)' : 'rgba(15,23,42,0.06)',
                color: isActive ? tokens.signalDark : tokens.slate,
                fontSize: '0.65rem',
                height: 22,
              }}
            />
          </Stack>

          <Box>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              {label}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontFamily: '"JetBrains Mono", monospace',
                color: isActive ? tokens.signalDark : tokens.slate,
              }}
            >
              {tagline}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          {isActive && (
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.75}
              sx={{ mt: 'auto', color: tokens.signalDark, fontWeight: 700 }}
            >
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Get estimate
              </Typography>
              <ArrowOutwardRoundedIcon sx={{ fontSize: 17 }} />
            </Stack>
          )}
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
