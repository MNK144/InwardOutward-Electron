import { db } from './rxdb';
import { v4 as uuid } from 'uuid';

export const getAllPayments = async () => {
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
  const data = { id, ...paymentData };
  console.log('data for insertion', data);
  const result = await db.payments.insert(data);
  return result._data;
};

export const deletePayment = async (id) => {
  const payment = await getPaymentDocument(id);
  const dltOp = await payment.remove();
};

export const updatePayment = async (id, paymentData) => {
  const payment = await getPaymentDocument(id);
  payment.modify((prev)=>{
    const updated = {...prev, ...paymentData};
    return updated;
  })
}