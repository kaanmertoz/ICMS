import { CustomerFormData } from "../types/customer";

export interface BackendCustomer {
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
    fullName: `${form.firstName} ${form.lastName}`.trim(),
    email: form.email,
    phoneNumber: form.phone,
    address: form.address,
    dateOfBirth: form.dateOfBirth || "1990-01-01", // geçici varsayılan
    insuranceCompanyId: form.insuranceCompanyId,
    insuranceType: form.insuranceType,
    status: form.status,
  };
};


