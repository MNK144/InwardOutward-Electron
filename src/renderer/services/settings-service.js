import { getSettings, updateSettings } from "renderer/database/settings";
// import API from "./API";
// const SettingsServiceLegacy = {
//   getCompanySettings: async function () {
//     return await API.get("/settings/companySettings");
//   },
//   updateCompanySettings: async function (companySettingsData) {   
//     return await API.put("/settings/companySettings",{companySettingsData});
//   },
// };

const SettingsService = {
  getCompanySettings: async function () {
    const settings = await getSettings();
    return {data: settings};
  },
  updateCompanySettings: async function (companySettingsData) {   
    const result = await updateSettings(companySettingsData);
    return {data: result};
  },
};

export default SettingsService;
