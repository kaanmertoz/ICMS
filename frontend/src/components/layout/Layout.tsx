import React from 'react';
import { Box, Container } from '@mui/material';
import { Header } from './Header';
import { Routes, Route } from 'react-router-dom';
import CustomersPage from '../../pages/CustomersPage';

export const Layout: React.FC = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      <Header />
      <Container component="main" sx={{ 
        flexGrow: 1, 
        p: 3,
        mt: 2
      }}>
        <Routes>
          <Route path="/" element={<CustomersPage />} />
        </Routes>
      </Container>
    </Box>
  );
}; 