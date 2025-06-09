import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  AppBar,
  Toolbar,
  Tooltip,
  Avatar,
  Badge,
  Container,
  CircularProgress,
} from "@mui/material";
import {
  Edit,
  Delete,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { InsuranceCompany } from "../types/insuranceCompany";
import {
  getInsuranceCompanies,
  createInsuranceCompany,
  updateInsuranceCompany,
  deleteInsuranceCompany,
} from "../services/api";
import { useThemeContext } from "../context/ThemeContext";

const InsuranceCompaniesPage: React.FC = () => {
  const { mode, toggleTheme } = useThemeContext();
  const [companies, setCompanies] = useState<InsuranceCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<InsuranceCompany | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const data = await getInsuranceCompanies();
      console.log("Gelen şirket verisi:", data);
      setCompanies(data || []);
    } catch (error) {
      console.error("Şirket verisi alınamadı:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleOpenDialog = (company?: InsuranceCompany) => {
    if (company) {
      setEditingCompany(company);
      setFormData({
        name: company.name || "",
        address: company.address || "",
        phoneNumber: company.phoneNumber || "",
        email: company.email || "",
      });
    } else {
      setEditingCompany(null);
      setFormData({
        name: "",
        address: "",
        phoneNumber: "",
        email: "",
      });
    }
    setTimeout(() => {
        setDialogOpen(true);
  }, 0);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async () => {
    try {
      if (editingCompany) {
        await updateInsuranceCompany(editingCompany.insuranceCompanyId, formData);
      } else {
        await createInsuranceCompany(formData);
      }
      await fetchCompanies();
      setDialogOpen(false);
    } catch (err) {
      console.error("Şirket kaydı başarısız:", err);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteInsuranceCompany(id);
    await fetchCompanies();
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* NAVBAR */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Insurance CMS
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Tooltip title="Tema Değiştir">
              <IconButton onClick={toggleTheme} color="inherit">
                {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Bildirimler">
              <IconButton color="inherit">
                <Badge badgeContent={2} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Profil">
              <IconButton color="inherit">
                <Avatar sx={{ width: 32, height: 32 }}>
                  <PersonIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* CONTENT */}
      <Container maxWidth="md" sx={{ py: 4, flex: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h4" fontWeight="bold">
            Sigorta Şirketleri
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
            Şirket Ekle
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ad</TableCell>
                  <TableCell>Adres</TableCell>
                  <TableCell>Telefon</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.insuranceCompanyId || company.name}>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.address}</TableCell>
                    <TableCell>{company.phoneNumber}</TableCell>
                    <TableCell>{company.email}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleOpenDialog(company)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(company.insuranceCompanyId)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>

      {/* DIALOG */}
      {dialogOpen && (
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>{editingCompany ? "Şirketi Güncelle" : "Yeni Şirket Ekle"}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="dense"
              label="Ad"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Adres"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Telefon"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>İptal</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingCompany ? "Güncelle" : "Oluştur"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default InsuranceCompaniesPage;
