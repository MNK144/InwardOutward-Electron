import { getInwardByID, getInwards, insertInward, removeInward, updateInward } from "renderer/database/inwards";
import API from "./API";

const InwardService = {
  getInward: async function (id) {
    return await API.get("/inwards/" + id);
  },
  getAllInwards: async function () {   
    return await API.get("/inwards");
  },
  createInward: async function (inwardData) {
    return await API.post("/inwards", { inwardData });
  },
  editInward: async function (id, inwardData) {
    return await API.put("/inwards", {
        id,
        inwardData,
      });
  },
  deleteInward: async function (id) {
    return await API.delete("/inwards", { data: { id } });
  },
};

const InwardServiceNew = {
  getInward: async function (id) {
    const inward = await getInwardByID(id);
    return {data: inward};
  },
  getAllInwards: async function () {   
    const inwards = await getInwards();
    return {data: inwards};
  },
  createInward: async function (inwardData) {
    const inward = await insertInward(inwardData);
    if(inward) {
      return {data: {inwardID: inward.id}};
    } else {
      throw "Error Inserting Inward";
    }
  },
  editInward: async function (id, inwardData) {
    const result = await updateInward(id,inwardData);
    return {data: result};
  },
  deleteInward: async function (id) {
    const result = await removeInward(id);
    return {data: result};
  },
};

export default InwardService;
