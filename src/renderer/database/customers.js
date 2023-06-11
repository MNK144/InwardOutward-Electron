import { db } from './rxdb';
import { v4 as uuid } from 'uuid';

export const getAllCustomers = async () => {
  const customers = await db.customers.find({}).exec();
  const customersData = customers.map((customer) => customer._data);
  console.log('customersData', customersData);
  return customersData;
};

const getCustomerDocument = async (id) => {
  const customer = await db.customers
    .find({
      selector: {
        id: { $eq: id },
      },
    })
    .exec();
  return customer[0];
};

export const getCustomerByID = async (id) => {
  const customer = await getCustomerDocument(id);
  const customerData = customer?._data;
  console.log('customerData', customerData);
  return customerData;
};

export const insertCustomer = async (customerData) => {
  const id = uuid();
  const data = { id, ...customerData };
  console.log('data for insertion', data);
  const result = await db.customers.insert(data);
  return result._data;
};

export const deleteCustomer = async (id) => {
  const customer = await getCustomerDocument(id);
  const dltOp = await customer.remove();
};

export const updateCustomer = async (id, customerData) => {
  const customer = await getCustomerDocument(id);
  customer.modify((prev)=>{
    const updated = {...prev, ...customerData};
    return updated;
  })
}