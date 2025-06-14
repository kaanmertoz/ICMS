import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeContextProvider } from "./context/ThemeContext";
import CustomerPage from "./pages/CustomersPage";
import InsuranceCompaniesPage from "./pages/InsuranceCompaniesPage";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer"; // 👈 Footer importu
import { Box } from "@mui/material";

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Navbar />
          <Routes>
            <Route path="/" element={<CustomerPage />} />
            <Route path="/companies" element={<InsuranceCompaniesPage />} />
          </Routes>
          <Footer />
        </Box>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
