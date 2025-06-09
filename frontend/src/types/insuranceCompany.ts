export interface InsuranceCompany {
    insuranceCompanyId: number;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    customers?: any[]; // veya daha sonra Customer[] olarak genişletilebilir
  }
  