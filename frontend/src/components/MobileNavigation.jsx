import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { tokens } from '../theme.js';

const MobileNavigation = ({ links, open, onOpen, onClose }) => {
  const { pathname } = useLocation();

  return (
    <>
      <IconButton
        onClick={onOpen}
        sx={{ display: { xs: 'inline-flex', md: 'none' }, color: '#fff' }}
        aria-label="Open navigation menu"
        aria-expanded={open}
      >
        <MenuRoundedIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: tokens.inkNavy,
            color: '#fff',
            borderLeft: `1px solid ${tokens.lineOnDark}`,
          },
        }}
      >
        <Box
          component="nav"
          aria-label="Mobile navigation"
          sx={{ pt: 2, height: '100%' }}
        >
          <Box sx={{ px: 3, py: 2 }}>
            <Typography variant="overline" sx={{ color: tokens.slateOnDark }}>
              Explore
            </Typography>
          </Box>
          <List>
            {links.map((link) => (
              <ListItemButton
                key={link.to}
                component={RouterLink}
                to={link.to}
                onClick={onClose}
                selected={pathname === link.to}
                sx={{
                  mx: 1.5,
                  mb: 0.5,
                  borderRadius: 2,
                  color: pathname === link.to ? '#fff' : tokens.slateOnDark,
                  '&.Mui-selected': {
                    bgcolor: 'rgba(20,184,174,0.16)',
                    color: '#fff',
                  },
                  '&.Mui-selected:hover': { bgcolor: 'rgba(20,184,174,0.22)' },
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ sx: { fontWeight: 600 } }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileNavigation;
