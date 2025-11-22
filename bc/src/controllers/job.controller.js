import Job from "../models/Job.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// CREATE JOB
export const createJob = async (req, res, next) => {
  try {
    const {
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

    if (
      !jobName ||
      !description ||
      !location ||
      !duration ||
      !date ||
      !wageMin ||
      !wageMax ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({ message: "All fields are required." });
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

    res.status(201).json({ job, message: "Job posted successfully!" });
  } catch (err) {
    next(err);
  }
};

// DELETE JOB
export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!job) {
      return res.status(404).json({ message: "Job not found or unauthorized" });
    }
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// GET ALL JOBS
export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().populate("user", "name email");
    res.json(jobs);
  } catch (err) {
    next(err);
  }
};

// You can add getMyJobs, updateJob similarly if not already present

const decoded = jwt.verify(token, process.env.JWT_SECRET);
const userId = decoded.id || decoded._id; // support both
const user = await User.findById(userId);