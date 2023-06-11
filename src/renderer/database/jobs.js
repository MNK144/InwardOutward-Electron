import { db } from './rxdb';
import { v4 as uuid } from 'uuid';

const getJobCountDocument = async (year) => {
  const jobCount = await db.jobcount
    .find({
      selector: {
        year: { $eq: year },
      },
    })
    .exec();
  return jobCount[0];
};

export const getJobIDCount = async (year) => {
  const jobCount = await getJobCountDocument(year);
  console.log('jobCountDocument', jobCount);
  if (jobCount) {
    return {
      status: "Success",
      message: 'Year Found',
      count: jobCount._data.count,
    };
  } else {
    const yearData = {
      year: year,
      count: 1,
    };
    await db.jobcount.insert(yearData);
    return {
      status: "Created",
      message: 'Year Data Created',
      count: 1,
    };
  }
};

export const updateJobIDCount = async (year) => {
  const jobCount = await getJobCountDocument(year);
  if (jobCount) {
    await jobCount.modify((prev) => {
      const updated = { ...prev, count: prev.count + 1 };
      return updated;
    });
    return {
      status: "Success",
      message: "JobCount Updated",
    }
  } else {
    throw 'Year not found';
  }
};

export const getJobs = async () => {
  const jobs = await db.jobs.find({}).exec();
  const jobsData = jobs.map((jobs) => jobs._data);
  console.log('jobsData', jobsData);
  return jobsData;
};

const getJobDocument = async (id) => {
  const job = await db.jobs
    .find({
      selector: {
        id: { $eq: id },
      },
    })
    .exec();
  return job[0];
};

export const getJobByID = async (id) => {
  const job = await getJobDocument(id);
  const jobData = job?._data;
  console.log('jobData', jobData);
  return jobData;
};

export const insertJob = async (jobData) => {
  const id = uuid();
  const data = { id, ...jobData };
  console.log('data for insertion', data);
  const result = await db.jobs.insert(data);
  return result._data;
};

export const removeJob = async (id) => {
  const job = await getJobDocument(id);
  const dltOp = await job.remove();
  return {
    status: "Success",
    message: "JobData Deleted Successfully",
  }
};

export const updateJob = async (id, jobData) => {
  const job = await getJobDocument(id);
  await job.modify((prev) => {
    const updated = { ...prev, ...jobData };
    return updated;
  });
  return {
    status: "Success",
    message: "JobData Updated Successfully",
  }
};
