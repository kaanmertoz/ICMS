import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import CustomerForm from "./components/customer/CustomerForm";
import { useThemeContext } from "./context/ThemeContext";
import { BackendCustomer } from "./mappers/customerMapper";
import { customerApi } from "./services/api";

function App() {
  const { mode, toggleTheme } = useThemeContext();
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [customers, setCustomers] = useState<BackendCustomer[]>([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const data = await customerApi.getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      showSnackbar("Müşteriler yüklenemedi", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: BackendCustomer) => {
    try {
      setIsLoading(true);
      await customerApi.createCustomer(data);
      showSnackbar("Müşteri başarıyla eklendi", "success");
      fetchCustomers();
      setOpenDialog(false);
    } catch (error) {
      console.error("Müşteri eklenemedi:", error);
      showSnackbar("Müşteri eklenirken hata oluştu", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showSnackbar = (
    message: string,
    severity: "success" | "error"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* ÜST NAVBAR */}
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

      {/* ANA İÇERİK */}
      <Container maxWidth="md" sx={{ py: 4, flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Müşteri Listesi
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Müşteri Ekle
          </Button>
        </Box>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : customers.length === 0 ? (
          <Typography>Müşteri bulunamadı.</Typography>
        ) : (
          <Box component="ul" sx={{ pl: 3 }}>
            {customers.map((customer, i) => (
              <li key={i}>
                <strong>{customer.fullName}</strong> — {customer.email}
              </li>
            ))}
          </Box>
        )}
      </Container>

      {/* FORM DIALOG */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>Yeni Müşteri Ekle</DialogTitle>
        <DialogContent>
          <CustomerForm
            onSubmit={handleSubmit}
            onCancel={() => setOpenDialog(false)}
            isLoading={isLoading}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>İptal</Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
