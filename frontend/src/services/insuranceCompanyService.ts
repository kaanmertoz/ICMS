import axios from 'axios';
import { InsuranceCompany } from '../types/insuranceCompany';

const baseURL = 'http://localhost:5022/api/InsuranceCompanies';

export const insuranceCompanyService = {
  getAllCompanies: () => axios.get<InsuranceCompany[]>(baseURL),
  getCompanyById: (id: number) => axios.get<InsuranceCompany>(`${baseURL}/${id}`),
  createCompany: (data: Omit<InsuranceCompany, 'insuranceCompanyId'>) =>
    axios.post<InsuranceCompany>(baseURL, data),
  updateCompany: (id: number, data: InsuranceCompany) =>
    axios.put(`${baseURL}/${id}`, data),
  deleteCompany: (id: number) => axios.delete(`${baseURL}/${id}`)
};
