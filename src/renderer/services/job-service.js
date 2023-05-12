import API from "./API";

const JobService = {
    getJobCount: async (year) => {
        return await API.post('/jobs/count/get',{year});
    },
    updateJobCount: async (year) => {
        return await API.post('/jobs/count/updateCount',{year});
    }
};

export default JobService;