import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Avatar,
  Badge,
  Box,
  Button
} from '@mui/material';
import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useThemeContext } from '../../context/ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';

const Navbar = () => {
  const { mode, toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <Tooltip title="Go to home">
          <Box
            display="flex"
            alignItems="center"
            onClick={() => navigate('/')}
            sx={{ cursor: 'pointer', mr: 4 }}
          >
          <BusinessIcon sx={{ fontSize: 28, mr: 1 }} />
          <Typography variant="h6" fontWeight={700}>
            Customer Management System
          </Typography>
        </Box>
        </Tooltip>


        {/* Sol Menü */}
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button
            onClick={() => navigate('/')}
            sx={{
              color: isActive('/') ? 'secondary.main' : 'inherit',
              fontWeight: isActive('/') ? 'bold' : 'normal',
              borderBottom: isActive('/') ? 2 : 0,
              borderColor: 'secondary.main',
              borderRadius: 0,
              px: 1.5,
            }}
          >
            Customers
          </Button>

          <Button
            onClick={() => navigate('/companies')}
            sx={{
              color: isActive('/companies') ? 'secondary.main' : 'inherit',
              fontWeight: isActive('/companies') ? 'bold' : 'normal',
              borderBottom: isActive('/companies') ? 2 : 0,
              borderColor: 'secondary.main',
              borderRadius: 0,
              px: 1.5,
            }}
          >
            Companies
          </Button>
        </Box>

        {/* Sağ Menü */}
        <IconButton color="inherit">
          <Badge badgeContent={2} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Tooltip title="Toggle Theme">
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>
        <IconButton color="inherit">
          <PersonIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
