import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    let {
      jobName,
      description,
      location,
      duration,
      date,
      wageMin,
      wageMax,
      requirements,
      latitude,
      longitude
    } = req.body;

    // Convert to numbers if needed
    latitude = Number(latitude);
    longitude = Number(longitude);

    // Validate coordinates
    if (
      typeof latitude !== "number" ||
      typeof longitude !== "number" ||
      isNaN(latitude) ||
      isNaN(longitude)
    ) {
      return res.status(400).json({ message: "Latitude and longitude are required and must be numbers." });
    }

    const job = await Job.create({
      user: req.user._id,
      jobName,
      description,
      location,
      duration,
      date,
      wageMin,
      wageMax,
      requirements,
      latitude,
      longitude
    });

    res.status(201).json({ job });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to create job" });
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