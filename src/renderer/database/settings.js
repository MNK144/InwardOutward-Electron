import { db } from './rxdb';
import { v4 as uuid } from 'uuid';

const getSettingsDocument = async () => {
  const settings = await db.settings
    .find({
      selector: {
        id: { $eq: '1' },
      },
    })
    .exec();
  return settings[0];
};

export const initSettings = async () => {
  const settings = getSettingsDocument();
  if (!settings) {
    const settingsData = {
      id: '1',
      companyName: 'XYZ Computers',
      address: '123 Abc Street, X City',
      contact: '9876543210',
      email: 'test@gmail.com',
      jobID: 'ABC',
      inwardTC: '',
      outwardTC: '',
      paymentTC: '',
    };
    await db.settings.insert(settingsData);
  }
};

export const getSettings = async () => {
  const settings = await getSettingsDocument();
  const settingsData = settings?._data;
  console.log('settingsData', settingsData);
  return settingsData;
};

export const updateSettings = async (settingsData) => {
  const settings = await getSettingsDocument();
  await settings.modify((prev) => {
    const updated = { ...prev, ...settingsData };
    return updated;
  });
};
