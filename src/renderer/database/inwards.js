import { db } from './rxdb';
import { v4 as uuid } from 'uuid';

export const getInwards = async () => {
  const inwards = await db.inwards.find({}).exec();
  const inwardsData = inwards.map((inwards) => inwards._data);
  console.log('inwardsData', inwardsData);
  return inwardsData;
};

const getInwardDocument = async (id) => {
  const inward = await db.inwards
    .find({
      selector: {
        id: { $eq: id },
      },
    })
    .exec();
  return inward[0];
};

export const getInwardByID = async (id) => {
  const inward = await getInwardDocument(id);
  const inwardData = inward?._data;
  console.log('inwardData', inwardData);
  return inwardData;
};

export const insertInward = async (inwardData) => {
  const id = uuid();
  const data = { id, ...inwardData };
  console.log('data for insertion', data);
  const result = await db.inwards.insert(data);
  return {
    status: "Success",
    message: "New InwardData Added Successfully",
    inwardID: id,
  };
};

export const removeInward = async (id) => {
  const inward = await getInwardDocument(id);
  const dltOp = await inward.remove();
  return {
    status: "Success",
    message: "InwardData Deleted Successfully",
  }
};

export const updateInward = async (id, inwardData) => {
  const inward = await getInwardDocument(id);
  await inward.modify((prev)=>{
    const updated = {...prev, ...inwardData};
    return updated;
  })
  return {
    status: "Success",
    message: "InwardData Updated Successfully",
  }
}