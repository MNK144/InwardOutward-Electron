import API from "./API";

const PaymentService = {
  getPayment: async function (id) {
    return await API.get("/payments/" + id);
  },
  getAllPayments: async function () {
    return await API.get("/payments");
  },
  createPayment: async function (paymentData) {
    return await API.post("/payments", { paymentData });
  },
  updatePayment: async function (id, paymentData) {
    return await API.put("/payments", {
      id,
      paymentData,
    });
  },
  createTransaction: async function (paymentID, transactionData) {
    return await API.post("/payments/transaction", {
      paymentID,
      transactionData,
    });
  },
};

export default PaymentService;
