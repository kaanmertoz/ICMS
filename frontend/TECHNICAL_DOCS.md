# Insurance CMS Technical Documentation

## Project Structure

```
insurance-cms/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/        # Shared components
│   │   ├── customer/      # Customer-specific components
│   │   └── layout/        # Layout components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript interfaces
│   ├── utils/             # Utility functions
│   ├── context/           # React Context providers
│   └── assets/            # Static assets
├── public/                # Public assets
└── package.json          # Dependencies
```

## Component Documentation

### CustomerForm
```typescript
interface CustomerFormProps {
    initialData?: CustomerFormData;
    onSubmit: (data: CustomerFormData) => void;
    onCancel?: () => void;
    isLoading?: boolean;
}
```

### CustomerList
```typescript
interface CustomerListProps {
    customers: Customer[];
    onEdit: (customer: Customer) => void;
    onDelete: (customer: Customer) => void;
    isLoading?: boolean;
}
```

### CustomerSearch
```typescript
interface CustomerSearchProps {
    filters: CustomerFilters;
    onFilterChange: (filters: CustomerFilters) => void;
    isLoading?: boolean;
}
```

## Data Models

### Customer
```typescript
interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    policyNumber?: string;
    dateOfBirth: string;
    insuranceType: InsuranceType;
    createdAt: string;
    updatedAt: string;
}
```

### Insurance Types
```typescript
enum InsuranceType {
    HEALTH = 'HEALTH',
    LIFE = 'LIFE',
    AUTO = 'AUTO',
    HOME = 'HOME',
    BUSINESS = 'BUSINESS'
}
```

## API Integration

### Endpoints
- GET /api/customers - List all customers
- GET /api/customers/{id} - Get customer by ID
- POST /api/customers - Create new customer
- PUT /api/customers/{id} - Update customer
- DELETE /api/customers/{id} - Delete customer

### Mock Implementation
Currently using mock data for development. To switch to real API:
1. Update VITE_API_BASE_URL in .env
2. Restore original api.ts implementation

## State Management
- Using React hooks for local state
- Custom useCustomers hook for customer data management
- React Context available for future global state needs

## Styling
- Material-UI (MUI) for components
- Custom theme configuration
- Responsive design breakpoints
- CSS-in-JS with emotion

## Error Handling
- Toast notifications for user feedback
- Error boundaries for component errors
- API error handling with interceptors
- Loading states for better UX

## Future Improvements
1. Authentication and Authorization
2. Advanced filtering and search
3. Bulk operations
4. Data export/import
5. Analytics dashboard
6. Performance optimizations
7. Unit and integration tests 