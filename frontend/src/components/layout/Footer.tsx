import React from 'react';
import { Box, Typography, Container, useTheme, Stack } from '@mui/material';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 3,
        px: 2,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
    >
      <Container maxWidth="md">
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" flexWrap="wrap">
          <Box component="img"
            src="/aydin-logo.png"
            alt="İstanbul Aydın Üniversitesi"
            sx={{ height: 50 }}
          />
          <Box textAlign="center">
            <Typography variant="body1" fontWeight="bold">
              Kaan Mert Öz & Sefer Şahin
            </Typography>
            <Typography variant="body2">
              Istanbul Aydin University - Software Engineering
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
              © 2025 Customer Management System
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
