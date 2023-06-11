import { removeCustomer, getCustomerByID, getCustomers, insertCustomer, updateCustomer } from "renderer/database/customers";
import API from "./API";

const CustomerService = {
  getCustomer: async function (customerId) {
    return await API.get("/customers/" + customerId);
  },
  getAllCustomers: async function () {   
    return await API.get("/customers");
  },
  createCustomer: async function (customerData) {
    return await API.post("/customers", { customerData });
  },
  editCustomer: async function (customerId, customerData) {
    return await API.put("/customers", {
        id: customerId,
        customerData,
      });
  },
  deleteCustomer: async function (customerId) {
    return await API.delete("/customers", { data: { id: customerId } });
  },
};

export const CustomerServiceNew = {
  getCustomer: async function (customerId) {
    const customer = await getCustomerByID(customerId);
    return { data: customer };
  },
  getAllCustomers: async function () {   
    const customers = await getCustomers();
    return { data: customers };
  },
  createCustomer: async function (customerData) {
    const customer = await insertCustomer(customerData);
    if(customer) {
      return {data: customer};
    } else {
      throw  'Error Inserting Customer';
    }
  },
  editCustomer: async function (customerId, customerData) {
    const result = await updateCustomer(customerId, customerData);
    return {data: result};
  },
  deleteCustomer: async function (customerId) {
    const result = await removeCustomer(customerId) ;
    return {data: result};
  },
};

export default CustomerService;
