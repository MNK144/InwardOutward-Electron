import API from "./API";

const SettingsService = {
  getCompanySettings: async function () {
    return await API.get("/settings/companySettings");
  },
  updateCompanySettings: async function (companySettingsData) {   
    return await API.put("/settings/companySettings",{companySettingsData});
  },
};

export default SettingsService;
