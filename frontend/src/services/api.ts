import { Customer, CustomerFormData, CustomerFilters, InsuranceType } from '../types/customer';
import { mockCustomers } from './mockData';

// Mock API implementation
export const customerApi = {
    // Get all customers with optional filters
    getCustomers: async (filters?: CustomerFilters): Promise<Customer[]> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            let filteredCustomers = [...mockCustomers];

            if (filters?.search) {
                const search = filters.search.toLowerCase();
                filteredCustomers = filteredCustomers.filter(customer => 
                    customer.firstName.toLowerCase().includes(search) ||
                    customer.lastName.toLowerCase().includes(search) ||
                    customer.email.toLowerCase().includes(search) ||
                    customer.phone.toLowerCase().includes(search)
                );
            }

            if (filters?.insuranceType) {
                filteredCustomers = filteredCustomers.filter(
                    customer => customer.insuranceType === filters.insuranceType
                );
            }

            if (filters?.status) {
                filteredCustomers = filteredCustomers.filter(
                    customer => customer.status === filters.status
                );
            }

            if (filters?.sortBy) {
                const order = filters.sortOrder === 'desc' ? -1 : 1;
                filteredCustomers.sort((a, b) => {
                    switch (filters.sortBy) {
                        case 'name':
                            return order * (`${a.firstName} ${a.lastName}`)
                                .localeCompare(`${b.firstName} ${b.lastName}`);
                        case 'email':
                            return order * a.email.localeCompare(b.email);
                        case 'status':
                            return order * a.status.localeCompare(b.status);
                        default:
                            return 0;
                    }
                });
            }

            return filteredCustomers;
        } catch (error) {
            console.error('Error fetching customers:', error);
            throw error;
        }
    },

    // Get customer by ID
    getCustomerById: async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const customer = mockCustomers.find(c => c.id === id);
        if (!customer) {
            throw new Error('Customer not found');
        }
        return customer;
    },

    // Create new customer
    createCustomer: async (customer: Omit<Customer, 'id'>): Promise<Customer> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const newCustomer: Customer = {
            ...customer,
            id: Math.random().toString(36).substr(2, 9),
        };
        mockCustomers.push(newCustomer);
        return newCustomer;
    },

    // Update existing customer
    updateCustomer: async (id: string, customer: Partial<Customer>): Promise<Customer> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = mockCustomers.findIndex(c => c.id === id);
        if (index === -1) {
            throw new Error('Customer not found');
        }
        mockCustomers[index] = { ...mockCustomers[index], ...customer };
        return mockCustomers[index];
    },

    // Delete customer
    deleteCustomer: async (id: string): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = mockCustomers.findIndex(c => c.id === id);
        if (index === -1) {
            throw new Error('Customer not found');
        }
        mockCustomers.splice(index, 1);
    },
}; 