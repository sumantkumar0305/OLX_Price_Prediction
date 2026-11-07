import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import { tokens } from '../theme.js';

const ComingSoonDialog = ({ open, onClose, category }) => {
  if (!category) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ pb: 0 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              display: 'grid',
              placeItems: 'center',
              bgcolor: 'rgba(214,164,25,0.14)',
            }}
          >
            <ScheduleRoundedIcon sx={{ color: tokens.value }} />
          </Box>
          <Typography variant="h6">Model under development</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          The pricing model for <strong>{category.label}</strong> hasn't been
          trained yet. This category is shown for preview only &mdash; check
          back once it's live, and in the meantime try the fully working
          phone or laptop predictors.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComingSoonDialog;
