import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { insuranceCompanyService } from '../services/insuranceCompanyService';
import { InsuranceCompany } from '../types/insuranceCompany';

const InsuranceCompaniesPage = () => {
  const [companies, setCompanies] = useState<InsuranceCompany[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<InsuranceCompany | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await insuranceCompanyService.getAllCompanies();
      setCompanies(response.data);
    } catch (error) {
      console.error('Şirketler alınırken hata:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!selectedCompany) return;
    setSelectedCompany({ ...selectedCompany, [name]: value });
  };

  const handleAddClick = () => {
    setSelectedCompany({
      name: '',
      address: '',
      phoneNumber: '',
      email: '',
    } as InsuranceCompany);
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleEditClick = (company: InsuranceCompany) => {
    setSelectedCompany(company);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleDeleteClick = async (id: number) => {
    try {
      await insuranceCompanyService.deleteCompany(id);
      fetchCompanies();
    } catch (error) {
      console.error('Silme hatası:', error);
    }
  };

  const handleSubmit = async () => {
  console.log("✅ Kaydet tuşuna basıldı");

  try {
    if (editMode && selectedCompany?.insuranceCompanyId) {
      console.log("🛠️ Update process:", selectedCompany);
      await insuranceCompanyService.updateCompany(
        selectedCompany.insuranceCompanyId,
        selectedCompany
      );
    } else if (selectedCompany) {
      const companyToSend = { ...selectedCompany };
      delete companyToSend.insuranceCompanyId;

      console.log("📦 New data:", companyToSend);
      await insuranceCompanyService.createCompany(companyToSend);
    }

    console.log("✅ Successful, list is updating...");
    fetchCompanies();
    setOpenDialog(false);
    setSelectedCompany(null);
    setEditMode(false);
  } catch (error: any) {
    console.error("🚨 Saving error:", error);
    alert("An error occured!\n\n" + (error.message || JSON.stringify(error)));
  }
};

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Insurance Companies
      </Typography>
      <Button variant="contained" onClick={handleAddClick}>
        Add New Company
      </Button>
      <ul>
        {companies.map((company) => (
          <li key={company.insuranceCompanyId}>
            <strong>{company.name}</strong> – {company.email}{' '}
            <Button onClick={() => handleEditClick(company)}>Edit</Button>
            <Button onClick={() => handleDeleteClick(company.insuranceCompanyId!)} color="error">
              Delete
            </Button>
          </li>
        ))}
      </ul>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? 'Edit Company' : 'Add New Company'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                label="Company Name"
                name="name"
                value={selectedCompany?.name || ''}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                value={selectedCompany?.address || ''}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={selectedCompany?.phoneNumber || ''}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={selectedCompany?.email || ''}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" type="button">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InsuranceCompaniesPage;
