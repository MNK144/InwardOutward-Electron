import { getJobByID, getJobIDCount, getJobs, insertJob, updateJob, updateJobIDCount } from "renderer/database/jobs";
import API from "./API";

const JobServiceLegacy = {
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

const JobService = {
  getJobCount: async (year) => {
    const jobCount = await getJobIDCount(year);
    return {data: jobCount};
  },
  updateJobCount: async (year) => {
    const result = await updateJobIDCount(year);
    return {data: result};
  },
  getAllJobs: async () => {
    const jobs = await getJobs();
    return {data: jobs};
  },
  getSingleJob: async (id) => {
    const job = await getJobByID(id);
    return {data: job};
  },
  createJobData: async (jobData) => {
    const job = await insertJob(jobData);
    if(job) {
      return { data: {jobID: job.id}};
    } else {
      throw "Error Inserting Job";
    }
  },
  updateJobData: async (id, jobData) => {
    const result = await updateJob(id, jobData);
    return {data: result};
  },
};

export default JobService;
