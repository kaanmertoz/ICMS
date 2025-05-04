import React, { useState, useEffect } from 'react';
import {
    Container,
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Alert,
    Snackbar,
    useTheme,
    AppBar,
    Toolbar,
    Tooltip,
    Avatar,
    Badge,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
    Notifications as NotificationsIcon,
    Person as PersonIcon,
} from '@mui/icons-material';
import { CustomerSearch } from './components/customer/CustomerSearch';
import { CustomerFilters, Customer, CustomerFormData, InsuranceType } from './types/customer';
import { customerApi } from './services/api';
import { useThemeContext } from './context/ThemeContext';

function App() {
    const theme = useTheme();
    const { mode, toggleTheme } = useThemeContext();
    const [filters, setFilters] = useState<CustomerFilters>({});
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [formData, setFormData] = useState<CustomerFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        insuranceType: InsuranceType.HEALTH,
        status: 'active',
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    useEffect(() => {
        fetchCustomers();
    }, [filters]);

    const fetchCustomers = async () => {
        try {
            setIsLoading(true);
            const data = await customerApi.getCustomers(filters);
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customers:', error);
            showSnackbar('Error fetching customers', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenDialog = (customer?: Customer) => {
        if (customer) {
            setSelectedCustomer(customer);
            setFormData({
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                phone: customer.phone,
                address: customer.address,
                insuranceType: customer.insuranceType,
                status: customer.status,
            });
        } else {
            setSelectedCustomer(null);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                insuranceType: InsuranceType.HEALTH,
                status: 'active',
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedCustomer(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            if (selectedCustomer) {
                await customerApi.updateCustomer(selectedCustomer.id, formData);
                showSnackbar('Customer updated successfully', 'success');
            } else {
                await customerApi.createCustomer(formData);
                showSnackbar('Customer created successfully', 'success');
            }
            handleCloseDialog();
            fetchCustomers();
        } catch (error) {
            console.error('Error saving customer:', error);
            showSnackbar('Error saving customer', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await customerApi.deleteCustomer(id);
                showSnackbar('Customer deleted successfully', 'success');
                fetchCustomers();
            } catch (error) {
                console.error('Error deleting customer:', error);
                showSnackbar('Error deleting customer', 'error');
            }
        }
    };

    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbar({ open: true, message, severity });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static" color="default" elevation={1}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Insurance CMS
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Tooltip title="Toggle theme">
                            <IconButton onClick={toggleTheme} color="inherit">
                                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Notifications">
                            <IconButton color="inherit">
                                <Badge badgeContent={4} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Profile">
                            <IconButton color="inherit">
                                <Avatar sx={{ width: 32, height: 32 }}>
                                    <PersonIcon />
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                        <Typography variant="h4" component="h1" sx={{ 
                            fontWeight: 'bold',
                            color: theme.palette.primary.main,
                        }}>
                            Customer Management
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog()}
                            sx={{ 
                                backgroundColor: theme.palette.primary.main,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                            }}
                        >
                            Add Customer
                        </Button>
                    </Box>
                    
                    <CustomerSearch
                        filters={filters}
                        onFilterChange={setFilters}
                        isLoading={isLoading}
                    />

                    <Paper 
                        elevation={3} 
                        sx={{ 
                            mt: 3, 
                            borderRadius: 2,
                            backgroundColor: theme.palette.background.paper,
                            overflow: 'hidden',
                        }}
                    >
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: theme.palette.background.default }}>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Insurance Type</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Policy Number</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {isLoading ? (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center">
                                                <CircularProgress />
                                            </TableCell>
                                        </TableRow>
                                    ) : customers.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center">
                                                No customers found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        customers.map((customer) => (
                                            <TableRow 
                                                key={customer.id} 
                                                hover
                                                sx={{ 
                                                    '&:hover': {
                                                        backgroundColor: theme.palette.action.hover,
                                                    },
                                                }}
                                            >
                                                <TableCell>{`${customer.firstName} ${customer.lastName}`}</TableCell>
                                                <TableCell>{customer.email}</TableCell>
                                                <TableCell>{customer.phone}</TableCell>
                                                <TableCell>
                                                    <Box
                                                        sx={{
                                                            display: 'inline-block',
                                                            px: 1.5,
                                                            py: 0.5,
                                                            borderRadius: 1,
                                                            backgroundColor: getInsuranceTypeColor(customer.insuranceType),
                                                            color: 'white',
                                                            fontWeight: 'medium',
                                                            fontSize: '0.875rem',
                                                        }}
                                                    >
                                                        {customer.insuranceType}
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Box
                                                        sx={{
                                                            display: 'inline-block',
                                                            px: 1.5,
                                                            py: 0.5,
                                                            borderRadius: 1,
                                                            backgroundColor: getStatusColor(customer.status),
                                                            color: 'white',
                                                            fontWeight: 'medium',
                                                            fontSize: '0.875rem',
                                                        }}
                                                    >
                                                        {customer.status}
                                                    </Box>
                                                </TableCell>
                                                <TableCell>{customer.policyNumber || '-'}</TableCell>
                                                <TableCell align="right">
                                                    <Tooltip title="Edit">
                                                        <IconButton
                                                            onClick={() => handleOpenDialog(customer)}
                                                            color="primary"
                                                            sx={{ mr: 1 }}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete">
                                                        <IconButton
                                                            onClick={() => handleDelete(customer.id)}
                                                            color="error"
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </Container>

            <Dialog 
                open={openDialog} 
                onClose={handleCloseDialog} 
                maxWidth="sm" 
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                    },
                }}
            >
                <DialogTitle>
                    {selectedCustomer ? 'Edit Customer' : 'Add New Customer'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <TextField
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            select
                            label="Insurance Type"
                            name="insuranceType"
                            value={formData.insuranceType}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                        >
                            <MenuItem value={InsuranceType.HEALTH}>Health</MenuItem>
                            <MenuItem value={InsuranceType.LIFE}>Life</MenuItem>
                            <MenuItem value={InsuranceType.PROPERTY}>Property</MenuItem>
                            <MenuItem value={InsuranceType.VEHICLE}>Vehicle</MenuItem>
                        </TextField>
                        <TextField
                            select
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                        >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </TextField>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button 
                        onClick={handleSubmit} 
                        variant="contained" 
                        color="primary"
                        sx={{ 
                            minWidth: 100,
                        }}
                    >
                        {selectedCustomer ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

const getInsuranceTypeColor = (type: string) => {
    switch (type) {
        case 'health':
            return '#4caf50';
        case 'life':
            return '#2196f3';
        case 'property':
            return '#ff9800';
        case 'vehicle':
            return '#9c27b0';
        default:
            return '#757575';
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'active':
            return '#4caf50';
        case 'pending':
            return '#ff9800';
        case 'inactive':
            return '#f44336';
        default:
            return '#757575';
    }
};

export { App }; 