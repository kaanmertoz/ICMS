import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
  Stack,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import CustomerForm from "../components/customer/CustomerForm";
import { useThemeContext } from "../context/ThemeContext";
import { customerApi } from "../services/api";
import { CustomerFormData } from "../types/customer";
import { BackendCustomer, toCustomerFormData, toBackendCustomer } from "../mappers/customerMapper";
import { useNavigate } from "react-router-dom";

const CustomerPage = () => {
  const { toggleTheme } = useThemeContext();
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [customers, setCustomers] = useState<BackendCustomer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<BackendCustomer | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const navigate = useNavigate();

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  const fetchCustomers = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await customerApi.getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      showSnackbar("Customers could not be fetched", "error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleSubmit = async (formData: CustomerFormData) => {
    try {
      setIsLoading(true);
      const backendData = toBackendCustomer(formData);

      if (formData.customerId) {
        await customerApi.updateCustomer(formData.customerId, backendData);
        showSnackbar("Customer updated successfully", "success");
      } else {
        await customerApi.createCustomer(backendData);
        showSnackbar("Customer added successfully", "success");
      }

      fetchCustomers();
      setOpenDialog(false);
      setSelectedCustomer(null);
    } catch (error) {
      console.error("Error submitting customer:", error);
      showSnackbar("An error occurred while saving the customer", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (customer: BackendCustomer) => {
    setSelectedCustomer(customer);
    setOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await customerApi.deleteCustomer(id);
      showSnackbar("Customer deleted", "success");
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
      showSnackbar("Failed to delete customer", "error");
    }
  };

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
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
            Customer List
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setSelectedCustomer(null);
                setOpenDialog(true);
              }}
            >
              Add Customer
            </Button>
          </Stack>
        </Box>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : customers.length === 0 ? (
          <Typography>No customers found.</Typography>
        ) : (
          <Box component="ul" sx={{ pl: 3 }}>
            {customers.map((customer, i) => (
              <li key={i}>
                <strong>{customer.fullName}</strong> — {customer.email}
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => handleEdit(customer)}
                  sx={{ ml: 2 }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  startIcon={<DeleteIcon />}
                  color="error"
                  onClick={() => handleDelete((customer as any).customerId)}
                  sx={{ ml: 1 }}
                >
                  Delete
                </Button>
              </li>
            ))}
          </Box>
        )}
      </Container>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>{selectedCustomer ? "Edit Customer" : "Add New Customer"}</DialogTitle>
        <DialogContent>
          <CustomerForm
            onSubmit={handleSubmit}
            onCancel={() => {
              setOpenDialog(false);
              setSelectedCustomer(null);
            }}
            initialData={
              selectedCustomer ? toCustomerFormData(selectedCustomer) : undefined
            }
            isLoading={isLoading}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

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
};

export default CustomerPage;
