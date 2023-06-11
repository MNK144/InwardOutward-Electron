import { createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { SCHEMA } from './SCHEMAS';
import { v4 as uuid } from "uuid";

addRxPlugin(RxDBDevModePlugin);

let db;

export const initRXDB = async () => {
  db = await createRxDatabase({
    name: 'iwdb',
    storage: getRxStorageDexie(),
  });

  await db.addCollections({
    customers: {
      schema: SCHEMA.customers,
    },
    inwards: {
      schema: SCHEMA.inwards,
    },
    outwards: {
      schema: SCHEMA.outwards,
    },
    payments: {
      schema: SCHEMA.payments,
    },
    jobs: {
      schema: SCHEMA.jobs,
    },
    jobcount: {
      schema: SCHEMA.jobcount,
    },
    settings: {
      schema: SCHEMA.settings,
    },
  });

  console.log("db instance",db);
};

export const insertTestData = async () => {
    await db.customers.insert({
      id: uuid(),
      name: 'Manank',
      address: 'A-123 XYZ Society, Ahmedabad',
      phone: "9876543210",
      email: "manank123@gmail.com",
    });
};

export const getData = async () => {
  const foundDocuments = await db.customers.find({}).exec();
  console.log('foundDocuments', foundDocuments);
};
