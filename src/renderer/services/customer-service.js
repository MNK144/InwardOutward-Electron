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

export default CustomerService;
