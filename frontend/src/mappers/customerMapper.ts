import { CustomerFormData, InsuranceType } from "../types/customer";

export interface BackendCustomer {
  customerId?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  insuranceCompanyId: number;
  insuranceType: string;
  status: string;
}

/**
 * Formdan gelen veriyi backend'e uygun Customer modeline çevirir.
 */
export const toBackendCustomer = (form: CustomerFormData): BackendCustomer => {
  return {
    customerId: form.customerId,
    fullName: `${form.firstName} ${form.lastName}`.trim(),
    email: form.email,
    phoneNumber: form.phone,
    address: form.address,
    dateOfBirth: form.dateOfBirth || "1990-01-01",
    insuranceCompanyId: form.insuranceCompanyId,
    insuranceType: form.insuranceType,
    status: form.status,
  };
};

/**
 * Backend'den gelen veriyi frontend'e uygun form datasına çevirir.
 */
export const toFrontendCustomer = (data: any): CustomerFormData => {
  const [firstName, ...rest] = data.FullName?.split(" ") ?? [];
  const lastName = rest.join(" ");

  return {
    customerId: data.CustomerId?.toString(),
    firstName,
    lastName,
    email: data.Email,
    phone: data.PhoneNumber,
    address: data.Address,
    dateOfBirth: data.DateOfBirth,
    insuranceCompanyId: data.InsuranceCompanyId,
    insuranceType: data.InsuranceType,
    status: data.Status,
  };
};

export const toCustomerFormData = (backend: BackendCustomer): CustomerFormData => {
  const [firstName, ...rest] = backend.fullName.split(" ");
  return {
    firstName,
    lastName: rest.join(" ") || "",
    email: backend.email,
    phone: backend.phoneNumber,
    address: backend.address,
    insuranceType: backend.insuranceType as InsuranceType,
    status: backend.status as CustomerFormData["status"],
    dateOfBirth: backend.dateOfBirth,
    insuranceCompanyId: backend.insuranceCompanyId,
    customerId: (backend as any).customerId ?? "", // opsiyonel: varsa al
  };
};