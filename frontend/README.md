# Insurance Customer Management System (Frontend)

This is the frontend application for the Insurance Customer Management System, developed for Istanbul Aydın University's SEN302 - Software Architecture course (Spring 2024/2025).

## Project Structure

```
insurance-cms/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/        # Shared components (Button, Input, etc.)
│   │   ├── customer/      # Customer-specific components
│   │   └── layout/        # Layout components (Header, Footer, etc.)
│   ├── pages/             # Page components
│   ├── services/          # API services and data fetching
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript interfaces and types
│   ├── utils/             # Utility functions
│   ├── context/           # React Context providers
│   └── assets/            # Static assets (images, icons)
├── public/                # Public assets
└── package.json           # Project dependencies
```

## Tech Stack

- React.js with TypeScript
- Vite.js as build tool
- Material-UI for components
- Axios for API calls
- React Router for navigation
- React Toastify for notifications

## Features

- Customer CRUD operations
- Responsive design
- Form validation
- Error handling
- Loading states
- Search/filter functionality

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## API Integration

The frontend communicates with an ASP.NET Core Web API backend. API endpoints follow RESTful conventions:

- GET /api/customers - List all customers
- GET /api/customers/{id} - Get customer by ID
- POST /api/customers - Create new customer
- PUT /api/customers/{id} - Update customer
- DELETE /api/customers/{id} - Delete customer 