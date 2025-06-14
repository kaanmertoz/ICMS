export enum InsuranceType {
    HEALTH = "health",
    LIFE = "life",
    PROPERTY = "property",
    VEHICLE = "vehicle",
  }
  
  export type CustomerStatus = "active" | "pending" | "inactive";
  
  /**
   * Mock veride kullanılan müşteri tipi (id string olabilir)
   */
  export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    insuranceType: InsuranceType;
    status: CustomerStatus;
    policyNumber?: string;
    dateOfBirth?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  /**
   * Formdan çıkan veri yapısı (frontend odaklı)
   */
  export interface CustomerFormData {
    customerId?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    insuranceType: InsuranceType;
    status: CustomerStatus;
    dateOfBirth: string;
    insuranceCompanyId: number;
  }
  
  /**
   * Filtreleme işlemlerinde kullanılan yapı
   */
  export interface CustomerFilters {
    search?: string;
    insuranceType?: InsuranceType;
    status?: CustomerStatus;
    sortBy?: "name" | "email" | "status";
    sortOrder?: "asc" | "desc";
  }
  