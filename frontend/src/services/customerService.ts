import axios from "axios";
import { BackendCustomer } from "../mappers/customerMapper";

// Geliştirme ortamı için sabit base URL
const baseURL = "http://localhost:7089/api/customers";

export const getCustomers = () => {
  return axios.get(baseURL);
};

export const getCustomerById = (id: number) => {
  return axios.get(`${baseURL}/${id}`);
};

export const createCustomer = (data: BackendCustomer) => {
  return axios.post(baseURL, data);
};

export const updateCustomer = (id: number, data: BackendCustomer) => {
  return axios.put(`${baseURL}/${id}`, data);
};

export const deleteCustomer = (id: number) => {
  return axios.delete(`${baseURL}/${id}`);
};
