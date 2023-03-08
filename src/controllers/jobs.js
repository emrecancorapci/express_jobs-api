import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/bad-request.js';
import NotFoundError from '../errors/not-found.js';
import Job from '../models/Job.js';

export const getAllJobs = async (req, res) => {
  const { user } = res;

  const jobs = await Job.find({ createdBy: user.id });
  res.status(StatusCodes.OK).json(jobs);
};
export const getJob = async (req, res) => {
  const {
    user: { id: userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) throw new NotFoundError(`Cannot find the job with id: ${jobId}`);

  return res.status(StatusCodes.OK).json(job);
};
export const createJob = async (req, res) => {
  const {
    user: { id },
  } = req;

  req.body.createdBy = id;
  const job = await Job.create(req.body);

  return res.status(StatusCodes.CREATED).json(job);
};
export const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { id: userId },
    params: { id: jobId },
  } = req;

  if (!company || !position) {
    throw new BadRequestError('Company or position cannot be empty.');
  }

  const job = await Job.updateOne({ _id: jobId, createdBy: userId }, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(StatusCodes.OK).json(job);
};
export const deleteJob = async (req, res) => {
  const {
    user: { id: userId },
    params: { id: jobId },
  } = req;

  const job = await Job.deleteOne({ _id: jobId, createdBy: userId });

  if (!job) throw new NotFoundError(`Cannot find the job with id: ${jobId}`);

  return res.status(StatusCodes.OK).send();
};
