import API from "./API";

const OutwardService = {
  getOutward: async function (id) {
    return await API.get("/outwards/" + id);
  },
  getAllOutwards: async function () {   
    return await API.get("/outwards");
  },
  createOutward: async function (outwardData) {
    return await API.post("/outwards", { outwardData });
  },
  editOutward: async function (id, outwardData) {
    return await API.put("/outwards", {
        id,
        outwardData,
      });
  },
  deleteOutward: async function (id) {
    return await API.delete("/outwards", { data: { id } });
  },
};

export default OutwardService;
