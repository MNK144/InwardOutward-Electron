import { editPayment, getPaymentByID, getPayments, insertPayment, insertTransaction } from "renderer/database/payments";
import API from "./API";

const PaymentServiceLegacy = {
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

const PaymentService = {
  getPayment: async function (id) {
    const payment = await getPaymentByID(id);
    return {data: payment};
  },
  getAllPayments: async function () {
    const payments = await getPayments();
    return {data: payments};
  },
  createPayment: async function (paymentData) {
    const payment = await insertPayment(paymentData);
    if(payment) {
      return {data: {paymentID: payment.id}};
    } else {
      throw "Error Inserting Payment";
    }
  },
  updatePayment: async function (id, paymentData) {
    const result = await editPayment(id,paymentData);
    return {data: result}
  },
  createTransaction: async function (paymentID, transactionData) {
    const transaction = await insertTransaction(paymentID, transactionData);
    return {data: transaction};
  },
};

export default PaymentService;
