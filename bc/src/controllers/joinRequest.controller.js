import JoinRequest from "../models/JoinRequest.js";
import Job from "../models/Job.js";

export const applyJoinRequest = async (req, res, next) => {
  try {
    const { jobId, message } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found." });

    // Prevent duplicate requests
    const exists = await JoinRequest.findOne({ job: jobId, worker: req.user.id });
    if (exists) return res.status(400).json({ message: "Already requested for this job." });

    const joinRequest = await JoinRequest.create({
      job: jobId,
      worker: req.user.id,
      message
    });
    res.status(201).json({ joinRequest, message: "Request sent!" });
  } catch (err) {
    next(err);
  }
};

export const getRequestsForUser = async (req, res, next) => {
  try {
    const jobs = await Job.find({ user: req.user.id }).select("_id");
    const jobIds = jobs.map(j => j._id);
    const requests = await JoinRequest.find({ job: { $in: jobIds } })
      .populate("worker", "name email phone")
      .populate("job", "jobName location description duration date wageMin wageMax requirements");
    res.json({ requests });
  } catch (err) {
    next(err);
  }
};

export const getRequestsForWorker = async (req, res, next) => {
  try {
    const requests = await JoinRequest.find({ worker: req.user.id })
      .populate("job", "jobName location description duration date wageMin wageMax requirements");
    res.json({ requests });
  } catch (err) {
    next(err);
  }
};

export const updateRequestStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const request = await JoinRequest.findById(req.params.id).populate("job");
    if (!request) return res.status(404).json({ message: "Request not found." });

    // Only job owner can update status
    if (request.job.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized." });

    request.status = status;
    await request.save();
    res.json({ request, message: "Status updated." });
  } catch (err) {
    next(err);
  }
};