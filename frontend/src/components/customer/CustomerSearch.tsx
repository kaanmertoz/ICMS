import React, { useState, useEffect } from 'react';
import {
    Paper,
    InputBase,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    Box,
    Divider,
    useTheme,
    Typography,
} from '@mui/material';
import {
    Search as SearchIcon,
    Sort as SortIcon,
} from '@mui/icons-material';
import { CustomerFilters, InsuranceType } from '../../types/customer';

interface CustomerSearchProps {
    filters: CustomerFilters;
    onFilterChange: (filters: CustomerFilters) => void;
    isLoading: boolean;
}

export const CustomerSearch: React.FC<CustomerSearchProps> = ({
    filters,
    onFilterChange,
    isLoading,
}) => {
    const theme = useTheme();
    const [search, setSearch] = useState(filters.search || '');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFilterChange({
            ...filters,
            search: search,
        });
    };

    const handleInsuranceTypeChange = (e: any) => {
        onFilterChange({
            ...filters,
            insuranceType: e.target.value as InsuranceType,
        });
    };

    const handleStatusChange = (e: any) => {
        onFilterChange({
            ...filters,
            status: e.target.value as 'active' | 'pending' | 'inactive',
        });
    };

    const handleSortChange = (e: any) => {
        onFilterChange({
            ...filters,
            sortBy: e.target.value as 'name' | 'email' | 'status',
        });
    };

    const handleSortOrderChange = (e: any) => {
        onFilterChange({
            ...filters,
            sortOrder: e.target.value as 'asc' | 'desc',
        });
    };

    return (
        <Paper
            component="form"
            onSubmit={handleSearchSubmit}
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                mb: 2,
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search customers..."
                inputProps={{ 'aria-label': 'search customers' }}
                value={search}
                onChange={handleSearchChange}
                disabled={isLoading}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" disabled={isLoading}>
                <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel>Insurance Type</InputLabel>
                <Select
                    value={filters.insuranceType || ''}
                    onChange={handleInsuranceTypeChange}
                    label="Insurance Type"
                    disabled={isLoading}
                >
                    <MenuItem value="">All</MenuItem>
                    {Object.values(InsuranceType).map((type) => (
                        <MenuItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel>Status</InputLabel>
                <Select
                    value={filters.status || ''}
                    onChange={handleStatusChange}
                    label="Status"
                    disabled={isLoading}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
            </FormControl>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SortIcon />
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel>Sort By</InputLabel>
                    <Select
                        value={filters.sortBy || ''}
                        onChange={handleSortChange}
                        label="Sort By"
                        disabled={isLoading}
                    >
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="email">Email</MenuItem>
                        <MenuItem value="status">Status</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel>Order</InputLabel>
                    <Select
                        value={filters.sortOrder || 'asc'}
                        onChange={handleSortOrderChange}
                        label="Order"
                        disabled={isLoading}
                    >
                        <MenuItem value="asc">Ascending</MenuItem>
                        <MenuItem value="desc">Descending</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Paper>
    );
}; 