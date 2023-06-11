import { db } from './rxdb';
import { v4 as uuid } from 'uuid';

export const getOutwards = async () => {
  const outwards = await db.outwards.find({}).exec();
  const outwardsData = outwards.map((outwards) => outwards._data);
  console.log('outwardsData', outwardsData);
  return outwardsData;
};

const getOutwardDocument = async (id) => {
  const outward = await db.outwards
    .find({
      selector: {
        id: { $eq: id },
      },
    })
    .exec();
  return outward[0];
};

export const getOutwardByID = async (id) => {
  const outward = await getOutwardDocument(id);
  const outwardData = outward?._data;
  console.log('outwardData', outwardData);
  return outwardData;
};

export const insertOutward = async (outwardData) => {
  const id = uuid();
  const data = { id, ...outwardData, isActive: true };
  console.log('data for insertion', data);
  const result = await db.outwards.insert(data);
  return result._data;
};

export const removeOutward = async (id) => {
  const outward = await getOutwardDocument(id);
  const dltOp = await outward.remove();
  return {
    status: "Success",
    message: "OutwardData Deleted Successfully",
  }
};

export const updateOutward = async (id, outwardData) => {
  const outward = await getOutwardDocument(id);
  await outward.modify((prev)=>{
    const updated = {...prev, ...outwardData};
    return updated;
  })
  return {
    status: "Success",
    message: "OutwardData Updated Successfully",
  }
}