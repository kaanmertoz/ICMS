import { Customer, InsuranceType } from '../types/customer';

export const mockCustomers: Customer[] = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8901',
        address: '123 Main St, New York, NY',
        insuranceType: InsuranceType.HEALTH,
        status: 'active',
        policyNumber: 'POL-001'
    },
    {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+1 234 567 8902',
        address: '456 Oak Ave, Los Angeles, CA',
        insuranceType: InsuranceType.LIFE,
        status: 'pending',
        policyNumber: 'POL-002'
    },
    {
        id: '3',
        firstName: 'Robert',
        lastName: 'Johnson',
        email: 'robert.johnson@example.com',
        phone: '+1 234 567 8903',
        address: '789 Pine St, Chicago, IL',
        insuranceType: InsuranceType.PROPERTY,
        status: 'active',
        policyNumber: 'POL-003'
    },
    {
        id: '4',
        firstName: 'Emily',
        lastName: 'Williams',
        email: 'emily.williams@example.com',
        phone: '+1 234 567 8904',
        address: '321 Elm St, Houston, TX',
        insuranceType: InsuranceType.VEHICLE,
        status: 'inactive',
        policyNumber: 'POL-004'
    }
]; 