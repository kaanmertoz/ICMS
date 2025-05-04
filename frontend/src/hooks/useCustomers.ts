import { useState, useCallback } from 'react';
import { Customer, CustomerFormData } from '../types/customer';

export function useCustomers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCustomers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/customers');
            if (!res.ok) throw new Error('Failed to fetch customers');
            const data = await res.json();
            setCustomers(data);
        } catch (err: any) {
            setError(err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    }, []);

    const createCustomer = useCallback(async (customer: CustomerFormData) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customer),
            });
            if (!res.ok) throw new Error('Failed to create customer');
            await fetchCustomers();
        } catch (err: any) {
            setError(err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    }, [fetchCustomers]);

    const updateCustomer = useCallback(async (id: string, customer: CustomerFormData) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/customers/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customer),
            });
            if (!res.ok) throw new Error('Failed to update customer');
            await fetchCustomers();
        } catch (err: any) {
            setError(err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    }, [fetchCustomers]);

    const deleteCustomer = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/customers/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete customer');
            await fetchCustomers();
        } catch (err: any) {
            setError(err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    }, [fetchCustomers]);

    return {
        customers,
        loading,
        error,
        fetchCustomers,
        createCustomer,
        updateCustomer,
        deleteCustomer,
    };
} 