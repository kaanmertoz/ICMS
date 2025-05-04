import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Chip,
    Skeleton,
    Typography,
    Box,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { Customer } from '../../types/customer';

interface CustomerListProps {
    customers: Customer[];
    onEdit: (customer: Customer) => void;
    onDelete: (customer: Customer) => void;
    isLoading: boolean;
}

const getStatusColor = (status: Customer['status']) => {
    switch (status) {
        case 'active':
            return 'success';
        case 'pending':
            return 'warning';
        case 'inactive':
            return 'error';
        default:
            return 'default';
    }
};

const getInsuranceTypeColor = (type: Customer['insuranceType']) => {
    switch (type) {
        case 'health':
            return 'primary';
        case 'life':
            return 'secondary';
        case 'property':
            return 'info';
        case 'vehicle':
            return 'warning';
        default:
            return 'default';
    }
};

export const CustomerList: React.FC<CustomerListProps> = ({
    customers,
    onEdit,
    onDelete,
    isLoading,
}) => {
    if (isLoading) {
        return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Insurance Type</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[1, 2, 3].map((i) => (
                            <TableRow key={i}>
                                <TableCell><Skeleton /></TableCell>
                                <TableCell><Skeleton /></TableCell>
                                <TableCell><Skeleton /></TableCell>
                                <TableCell><Skeleton /></TableCell>
                                <TableCell><Skeleton /></TableCell>
                                <TableCell><Skeleton /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    if (customers.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="subtitle1" color="text.secondary">
                    No customers found
                </Typography>
            </Box>
        );
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight="bold">
                                Name
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight="bold">
                                Email
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight="bold">
                                Phone
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight="bold">
                                Insurance Type
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight="bold">
                                Status
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="subtitle2" fontWeight="bold">
                                Actions
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.map((customer) => (
                        <TableRow 
                            key={customer.id}
                            hover
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                transition: 'background-color 0.2s',
                            }}
                        >
                            <TableCell>
                                <Typography variant="body2">
                                    {customer.firstName} {customer.lastName}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" color="text.secondary">
                                    {customer.email}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" color="text.secondary">
                                    {customer.phone}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={customer.insuranceType}
                                    color={getInsuranceTypeColor(customer.insuranceType)}
                                    size="small"
                                    sx={{ textTransform: 'capitalize' }}
                                />
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={customer.status}
                                    color={getStatusColor(customer.status)}
                                    size="small"
                                    sx={{ textTransform: 'capitalize' }}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <IconButton
                                    size="small"
                                    onClick={() => onEdit(customer)}
                                    color="primary"
                                    sx={{ mr: 1 }}
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    onClick={() => onDelete(customer)}
                                    color="error"
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}; 