import { createRoot } from 'react-dom/client';
import App from './App';

import {initRXDB, getAllData} from "./database/rxdb";
import { deleteCustomer, getAllCustomers, getCustomerByID, insertCustomer, updateCustomer } from './database/customers';
import { deleteInward, getAllInwards, insertInward, updateInward } from './database/inwards';
import { v4 as uuid } from "uuid";
import { deleteOutward, getAllOutwards, getOutwardByID, insertOutward, updateOutward } from './database/outwards';
import { deletePayment, getAllPayments, getPaymentByID, insertPayment, updatePayment } from './database/payments';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

const handleDBTest = async () => {
  await initRXDB();
  // await insertTestData();
  await getAllData();

  // const c = await getAllCustomers();
  // console.log("c",c);
  // const d = await getCustomerByID("d2de45dd-9289-41c1-9776-fa475111be7e");
  // console.log("d",d);
  // const dt = {
  //   name: "Sunilbhai",
  //   address: "H-403 Satya Residency, New Ranip",
  //   phone: "9898989898",
  //   email: "sunil@gmail.com",
  // };
  // const e = await insertCustomer(dt);
  // const f = await deleteCustomer("d49eae11-4783-4f28-99c5-48800a2a9846");
  // const udt = {
  //   name: 'Manank'
  // }
  // const g = await updateCustomer("d2de45dd-9289-41c1-9776-fa475111be7e",udt);

  // const a = await getAllInwards();
  // const idt = {
  //   jobID: "SC/2022/1",
  //   customerID: "16fb8f7c-0f66-4c10-9fda-555bd6fd3828",
  //   inwardDate: "2022-12-15",
  //   receivedFrom: "Person1",
  //   totalCharge: "1000",
  //   serviceCharge: "800",
  //   partCharge: "200",
  //   isActive: true,
  //   inwardProducts: [
  //     {
  //       id: uuid(),
  //       products: "Lenovo Laptop",
  //       serialNo: "LEN001",
  //       problem: "Display Not Working",
  //       remarks: "Half Paid Already",
  //     },
  //     {
  //       id: uuid(),
  //       products: "Dell Laptop",
  //       serialNo: "DEL001",
  //       problem: "Keyboard Not Working",
  //       remarks: "Full Paid Already",
  //     },
  //   ],
  //   jobDataID: "d073028f-68d2-4216-bc17-0c768df71f73",
  // }
  // const ins = await insertInward(idt);
  // console.log("ins",ins);
  // await deleteInward("3b0d50c5-dbd4-433c-b8ee-4d64f375df5c");
  // await updateInward("548431bd-b36b-4e9c-b3bd-270be00be217", { partCharge: "400", totalCharge: "1200"});
  // await updateInward("548431bd-b36b-4e9c-b3bd-270be00be217", { inwardProducts: [
  //   {
  //     id: uuid(),
  //     products: "Dell Laptop",
  //     serialNo: "DEL001",
  //     problem: "Keyboard Not Working",
  //     remarks: "Full Paid Already",
  //   }] 
  // });

  // const a = await getAllOutwards();
  // console.log("a",a);
  // const b = await getOutwardByID("a3df7a72-7d57-4f2f-baa7-3388d82c0aca");
  // console.log("b",b);
  // const odt = {
  //   jobID: "SC/2022/1",
  //   inwardID: "548431bd-b36b-4e9c-b3bd-270be00be217",
  //   customerID: "16fb8f7c-0f66-4c10-9fda-555bd6fd3828",
  //   invoiceDate: "2022-12-16",
  //   serviceCharge: "1500",
  //   partCharge: "700",
  //   totalCharge: "2200",
  //   jobStatus: "Repaired",
  //   remarks: "Extra Time as well as parts were required",
  //   isActive: true,
  // }
  // const c = await insertOutward(odt);
  // console.log('c',c);
  // await updateOutward("a3df7a72-7d57-4f2f-baa7-3388d82c0aca", { partCharge: "500", totalCharge: "2000" });
  // await deleteOutward("a3df7a72-7d57-4f2f-baa7-3388d82c0aca");

  // const a = await getAllPayments();
  // console.log("a",a);
  // const b = await getPaymentByID('9ec25089-c64b-4b6c-895d-1d8b012f64e9');
  // console.log("b",b);
  // const pdt = {
  //   jobID: "SC/2022/1",
  //   outwardID: "bced650c-3013-4dbc-b483-e16c6ce8d90f",
  //   inwardID: "548431bd-b36b-4e9c-b3bd-270be00be217",
  //   customerID: "16fb8f7c-0f66-4c10-9fda-555bd6fd3828",
  //   outstandingAmount: "400",
  //   paidAmount: "1400",
  //   invoiceDate: "2022-12-16",
  //   paymentDate: "2022-12-17",
  //   isPending: true,
  //   transactionData: [
  //     {
  //         id: uuid(),
  //         paymentDate: "2022-12-16",
  //         paymentMode: "Online",
  //         remarks: "Half Paid",
  //         amount: "700",
  //     },
  //     {
  //         id: uuid(),
  //         paymentDate: "2022-12-17",
  //         paymentMode: "Cash",
  //         remarks: "Half Paid",
  //         amount: "700",
  //     }
  // ],
  // }
  // const c = await insertPayment(pdt);
  // console.log("c",c);
  //   await updatePayment('9ec25089-c64b-4b6c-895d-1d8b012f64e9', { outstandingAmount: "600", paidAmount: "1200", transactionData: [
  //     {
  //         id: "12d4037e-9350-4080-bf7c-366b8d626087",
  //         paymentDate: "2022-12-16",
  //         paymentMode: "Online",
  //         remarks: "Half Paid",
  //         amount: "600",
  //     },
  //     {
  //         id: "f64d88ed-ae40-4a09-af90-51cb59593ea9",
  //         paymentDate: "2022-12-17",
  //         paymentMode: "Cash",
  //         remarks: "Half Paid",
  //         amount: "600",
  //     }
  // ]})
  // await deletePayment('9ec25089-c64b-4b6c-895d-1d8b012f64e9');

}
handleDBTest();

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
