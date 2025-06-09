import axios from "axios";
import { BackendCustomer } from "../mappers/customerMapper";

const baseURL = "http://localhost:5022/api/customers";

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
