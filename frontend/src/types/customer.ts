export enum InsuranceType {
    HEALTH = 'health',
    LIFE = 'life',
    PROPERTY = 'property',
    VEHICLE = 'vehicle'
}

export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    insuranceType: InsuranceType;
    status: 'active' | 'pending' | 'inactive';
    policyNumber?: string;
    dateOfBirth?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CustomerFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    insuranceType: InsuranceType;
    status: 'active' | 'pending' | 'inactive';
}

export interface CustomerFilters {
    search?: string;
    insuranceType?: InsuranceType;
    status?: 'active' | 'pending' | 'inactive';
    sortBy?: 'name' | 'email' | 'status';
    sortOrder?: 'asc' | 'desc';
} 