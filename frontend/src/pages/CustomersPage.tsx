import React, { useEffect, useState } from "react";
import CustomerForm from "../components/customer/CustomerForm";
import {
  createCustomer,
  getCustomers,
} from "../services/customerService";
import { BackendCustomer } from "../mappers/customerMapper";

const CustomersPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState<BackendCustomer[]>([]);

  const handleSubmit = async (data: BackendCustomer) => {
    try {
      setIsLoading(true);
      await createCustomer(data);
      alert("Müşteri başarıyla eklendi!");
      await fetchCustomers();
    } catch (error) {
      console.error("Müşteri eklenemedi:", error);
      alert("Bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error("Müşteri listesi alınamadı:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Sigorta Müşteri Yönetimi</h2>
      <CustomerForm
        onSubmit={handleSubmit}
        onCancel={() => {}}
        isLoading={isLoading}
      />

      <h3 style={{ marginTop: "3rem" }}>Müşteri Listesi</h3>
      {customers.length === 0 ? (
        <p>Henüz müşteri eklenmedi.</p>
      ) : (
        <ul>
          {customers.map((customer, index) => (
            <li key={index}>
              {customer.fullName} — {customer.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomersPage;
