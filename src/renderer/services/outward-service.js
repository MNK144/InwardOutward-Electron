import { getOutwardByID, getOutwards, insertOutward, removeOutward, updateOutward } from "renderer/database/outwards";
// import API from "./API";
// const OutwardServiceLegacy = {
//   getOutward: async function (id) {
//     return await API.get("/outwards/" + id);
//   },
//   getAllOutwards: async function () {   
//     return await API.get("/outwards");
//   },
//   createOutward: async function (outwardData) {
//     return await API.post("/outwards", { outwardData });
//   },
//   editOutward: async function (id, outwardData) {
//     return await API.put("/outwards", {
//         id,
//         outwardData,
//       });
//   },
//   deleteOutward: async function (id) {
//     return await API.delete("/outwards", { data: { id } });
//   },
// };

const OutwardService = {
  getOutward: async function (id) {
    const outward = await getOutwardByID(id);
    return {data: outward};
  },
  getAllOutwards: async function () {   
    const outwards = await getOutwards();
    return {data: outwards};
  },
  createOutward: async function (outwardData) {
    const outward = await insertOutward(outwardData);
    if(outward) {
      return {data: {outwardID: outward.id}}
    } else {
      throw "Error Inserting Outward";
    }
  },
  editOutward: async function (id, outwardData) {
    const result = await updateOutward(id,outwardData);
    return {data: result};
  },
  deleteOutward: async function (id) {
    const result = await removeOutward(id);
    return {data: result};
  },
};

export default OutwardService;
