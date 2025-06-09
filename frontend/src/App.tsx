import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeContextProvider } from "./context/ThemeContext";
import CustomerPage from "./pages/CustomersPage";
import InsuranceCompaniesPage from "./pages/InsuranceCompaniesPage";

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CustomerPage />} />
          <Route path="/companies" element={<InsuranceCompaniesPage />} />
        </Routes>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
