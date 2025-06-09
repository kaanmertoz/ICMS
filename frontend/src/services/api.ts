import axios from "axios";
import { BackendCustomer } from "../mappers/customerMapper";
import { InsuranceCompany } from "../types/insuranceCompany";

const baseURL = "http://localhost:5022/api/customers";
const BASE_URL = "http://localhost:5022/api/insurancecompanies";

export const customerApi = {
  createCustomer: async (data: BackendCustomer) => {
    return axios.post(baseURL, data);
  },

  updateCustomer: async (id: string, data: BackendCustomer) => {
    return axios.put(`${baseURL}/${id}`, data);
  },

  deleteCustomer: async (id: string) => {
    return axios.delete(`${baseURL}/${id}`);
  },

  getCustomers: async () => {
    const response = await axios.get(baseURL);
    return response.data;
  },
};

export const getInsuranceCompanies = async (): Promise<InsuranceCompany[]> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createInsuranceCompany = async (data: Omit<InsuranceCompany, "insuranceCompanyId" | "customers">) => {
  return axios.post(BASE_URL, data);
};

export const updateInsuranceCompany = async (
  id: number,
  data: Omit<InsuranceCompany, "insuranceCompanyId" | "customers">
) => {
  return axios.put(`${BASE_URL}/${id}`, data);
};

export const deleteInsuranceCompany = async (id: number) => {
  return axios.delete(`${BASE_URL}/${id}`);
};