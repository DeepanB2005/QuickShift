import Job from "../models/Job.js";

export const createJob = async (req, res, next) => {
  try {
    const {
      jobName, description, location, duration, date,
      wageMin, wageMax, requirements
    } = req.body;

    if (!jobName || !description || !location || !duration || !date || !wageMin || !wageMax) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const job = await Job.create({
      user: req.user.id,
      jobName,
      description,
      location,
      duration,
      date,
      wageMin,
      wageMax,
      requirements
    });

    res.status(201).json({ job, message: "Job posted successfully!" });
  } catch (err) {
    next(err);
  }
};

export const getMyJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ jobs });
  } catch (err) {
    next(err);
  }
};

export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({ jobs });
  } catch (err) {
    next(err);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!job) return res.status(404).json({ message: "Job not found." });
    res.json({ job, message: "Job updated." });
  } catch (err) {
    next(err);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!job) return res.status(404).json({ message: "Job not found." });
    res.json({ message: "Job deleted." });
  } catch (err) {
    next(err);
  }
};