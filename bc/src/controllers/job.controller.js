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