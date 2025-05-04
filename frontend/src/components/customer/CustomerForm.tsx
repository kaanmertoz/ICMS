import React from 'react';
import {
    TextField,
    Button,
    MenuItem,
    Box,
    CircularProgress,
    Grid
} from '@mui/material';
import { Customer, CustomerFormData, InsuranceType } from '../../types/customer';

interface CustomerFormProps {
    onSubmit: (data: CustomerFormData) => void;
    onCancel: () => void;
    initialData?: Customer;
    isLoading?: boolean;
}

const insuranceTypes = Object.values(InsuranceType);
const statusOptions: Customer['status'][] = ['active', 'pending', 'inactive'];

export const CustomerForm: React.FC<CustomerFormProps> = ({
    initialData,
    onSubmit,
    onCancel,
    isLoading,
}) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        const data: CustomerFormData = {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            address: formData.get('address') as string,
            insuranceType: formData.get('insuranceType') as Customer['insuranceType'],
            status: formData.get('status') as Customer['status'],
        };

        onSubmit(data);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        defaultValue={initialData?.firstName}
                        required
                        variant="outlined"
                        disabled={isLoading}
                        sx={{ mb: 2 }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        defaultValue={initialData?.lastName}
                        required
                        variant="outlined"
                        disabled={isLoading}
                        sx={{ mb: 2 }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        defaultValue={initialData?.email}
                        required
                        variant="outlined"
                        disabled={isLoading}
                        sx={{ mb: 2 }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        defaultValue={initialData?.phone}
                        required
                        variant="outlined"
                        disabled={isLoading}
                        sx={{ mb: 2 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        defaultValue={initialData?.address}
                        required
                        variant="outlined"
                        disabled={isLoading}
                        multiline
                        rows={3}
                        sx={{ mb: 2 }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        select
                        label="Insurance Type"
                        name="insuranceType"
                        defaultValue={initialData?.insuranceType || 'health'}
                        required
                        variant="outlined"
                        disabled={isLoading}
                        sx={{ mb: 2 }}
                    >
                        {insuranceTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        select
                        label="Status"
                        name="status"
                        defaultValue={initialData?.status || 'active'}
                        required
                        variant="outlined"
                        disabled={isLoading}
                        sx={{ mb: 2 }}
                    >
                        {statusOptions.map((status) => (
                            <MenuItem key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                        <Button
                            variant="outlined"
                            disabled={isLoading}
                            sx={{ minWidth: 100 }}
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isLoading}
                            sx={{ minWidth: 100 }}
                        >
                            {isLoading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                `${initialData ? 'Update' : 'Create'} Customer`
                            )}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CustomerForm; 