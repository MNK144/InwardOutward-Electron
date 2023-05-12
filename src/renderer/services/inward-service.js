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

export default InwardService;
