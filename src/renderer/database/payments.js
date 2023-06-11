import { db } from './rxdb';
import { v4 as uuid } from 'uuid';

export const getPayments = async () => {
  const payments = await db.payments.find({}).exec();
  const paymentsData = payments.map((payments) => payments._data);
  console.log('paymentsData', paymentsData);
  return paymentsData;
};

const getPaymentDocument = async (id) => {
  const payment = await db.payments
    .find({
      selector: {
        id: { $eq: id },
      },
    })
    .exec();
  return payment[0];
};

export const getPaymentByID = async (id) => {
  const payment = await getPaymentDocument(id);
  const paymentData = payment?._data;
  console.log('paymentData', paymentData);
  return paymentData;
};

export const insertPayment = async (paymentData) => {
  const id = uuid();
  const data = { id, ...paymentData,  paymentDate: paymentData.invoiceDate, isPending: true, transactionData: []};
  console.log('data for insertion', data);
  const result = await db.payments.insert(data);
  return result._data;
};

export const removePayment = async (id) => {
  const payment = await getPaymentDocument(id);
  const dltOp = await payment.remove();
  return {
    status: "Success",
    message: "PaymentData Deleted Successfully",
  }
};

export const editPayment = async (id, paymentData) => {
  const payment = await getPaymentDocument(id);
  await payment.modify((prev)=>{
    const updated = {...prev, ...paymentData};
    return updated;
  })
  return {
    status: "Success",
    message: "PaymentData Updated Successfully",
  }
}

export const insertTransaction = async (paymentID, transactionData) => {
  const payment = await getPaymentDocument(paymentID);
  const id = uuid();
  await payment.modify((prev)=>{
    let transactions = Array.from(prev.transactionData);
    transactions.push({id, ...transactionData});
    return {...prev, transactionData: transactions};
  })
  return {
    status: "Success",
    message: "New Payment TransactionData Added Successfully",
    transactionID: id,
  }
}