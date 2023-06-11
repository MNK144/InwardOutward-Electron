import { createRoot } from 'react-dom/client';
import App from './App';

import {initRXDB, getAllData} from "./database/rxdb";
import { deleteCustomer, getAllCustomers, getCustomerByID, insertCustomer, updateCustomer } from './database/customers';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

const handleDBTest = async () => {
  await initRXDB();
  // await insertTestData();
  await getAllData();

  const c = await getAllCustomers();
  console.log("c",c);
  const d = await getCustomerByID("d2de45dd-9289-41c1-9776-fa475111be7e");
  console.log("d",d);

  const dt = {
    name: "Sunilbhai",
    address: "H-403 Satya Residency, New Ranip",
    phone: "9898989898",
    email: "sunil@gmail.com",
  };
  // const e = await insertCustomer(dt);

  // const f = await deleteCustomer("d49eae11-4783-4f28-99c5-48800a2a9846");

  const udt = {
    name: 'Manank'
  }
  // const g = await updateCustomer("d2de45dd-9289-41c1-9776-fa475111be7e",udt);
}
handleDBTest();

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
