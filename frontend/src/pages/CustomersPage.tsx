import React, { useEffect, useState } from 'react';
import {
    Typography,
    Button,
    Box,
    Paper,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { CustomerList } from '../components/customer/CustomerList';
import { CustomerForm } from '../components/customer/CustomerForm';
import { useCustomers } from '../hooks/useCustomers';
import { Customer, CustomerFormData } from '../types/customer';

export const CustomersPage: React.FC = () => {
    const {
        customers,
        loading,
        error,
        fetchCustomers,
        createCustomer,
        updateCustomer,
        deleteCustomer,
    } = useCustomers();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    const handleCreateClick = () => {
        setSelectedCustomer(null);
        setIsFormOpen(true);
    };

    const handleEditClick = (customer: Customer) => {
        setSelectedCustomer(customer);
        setIsFormOpen(true);
    };

    const handleDeleteClick = async (customer: Customer) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await deleteCustomer(customer.id);
            } catch (err) {
                console.error('Failed to delete customer:', err);
            }
        }
    };

    const handleFormSubmit = async (data: CustomerFormData) => {
        try {
            if (selectedCustomer) {
                await updateCustomer(selectedCustomer.id, data);
            } else {
                await createCustomer(data);
            }
            setIsFormOpen(false);
        } catch (err) {
            console.error('Failed to save customer:', err);
        }
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setSelectedCustomer(null);
    };

    if (error && !loading) {
        return (
            <Container>
                <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="error" gutterBottom>
                        {error}
                    </Typography>
                    <Button variant="contained" onClick={() => fetchCustomers()}>
                        Retry
                    </Button>
                </Box>
            </Container>
        );
    }

    const activeCustomers = customers.filter(c => c.status === 'active').length;
    const pendingCustomers = customers.filter(c => c.status === 'pending').length;
    const inactiveCustomers = customers.filter(c => c.status === 'inactive').length;

    return (
        <Box>
            <Paper 
                sx={{ 
                    p: 3, 
                    mb: 3, 
                    background: theme => theme.palette.mode === 'dark'
                        ? 'linear-gradient(45deg, #23272f 0%, #1a1d23 100%)'
                        : `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                    color: 'white'
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Customers
                        </Typography>
                        <Typography variant="subtitle1">
                            Manage your insurance customers
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleCreateClick}
                        sx={{
                            backgroundColor: theme => theme.palette.mode === 'dark'
                                ? '#183153'
                                : 'white',
                            color: theme => theme.palette.mode === 'dark'
                                ? 'white'
                                : theme.palette.primary.main,
                            '&:hover': {
                                backgroundColor: theme => theme.palette.mode === 'dark'
                                    ? '#102040'
                                    : theme.palette.grey[100],
                            },
                        }}
                    >
                        Add Customer
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Chip 
                        label={`Active: ${activeCustomers}`}
                        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                    />
                    <Chip 
                        label={`Pending: ${pendingCustomers}`}
                        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                    />
                    <Chip 
                        label={`Inactive: ${inactiveCustomers}`}
                        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                    />
                </Box>
            </Paper>

            <Paper sx={{ overflow: 'hidden' }}>
                <CustomerList
                    customers={customers}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                    isLoading={loading}
                />
            </Paper>

            <Dialog
                open={isFormOpen}
                onClose={handleFormClose}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 2 }
                }}
            >
                <DialogTitle sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, pb: 2 }}>
                    {selectedCustomer ? 'Edit Customer' : 'Add New Customer'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <CustomerForm
                            initialData={selectedCustomer || undefined}
                            onSubmit={handleFormSubmit}
                            onCancel={handleFormClose}
                            isLoading={loading}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
}; 