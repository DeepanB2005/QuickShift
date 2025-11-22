import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { createJob, getMyJobs, updateJob, deleteJob, getAllJobs } from "../controllers/job.controller.js";

const router = Router();

router.post("/", auth, createJob);
router.get("/my", auth, getMyJobs);
router.patch("/:id", auth, updateJob);
router.delete("/:id", auth, deleteJob);
router.get("/all", getAllJobs);

export default router;