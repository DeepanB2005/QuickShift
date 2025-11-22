import Job from "../models/Job.js";

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

// You can add getMyJobs, updateJob, getAllJobs similarly if not already present.