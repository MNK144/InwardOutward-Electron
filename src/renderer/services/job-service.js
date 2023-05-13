import API from "./API";

const JobService = {
  getJobCount: async (year) => {
    return await API.post("/jobs/count/get", { year });
  },
  updateJobCount: async (year) => {
    return await API.post("/jobs/count/updateCount", { year });
  },
  getAllJobs: async () => {
    return await API.get('/jobs');
  },
  getSingleJob: async (id) => {
    return await API.get('/jobs/'+id);
  },
  createJobData: async (jobData) => {
    return await API.post("/jobs", { jobData });
  },
  updateJobData: async (id, jobData) => {
    return await API.put("/jobs", { id, jobData });
  },
};

export default JobService;
