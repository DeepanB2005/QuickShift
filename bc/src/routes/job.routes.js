import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { createJob } from "../controllers/job.controller.js";

const router = Router();

router.post("/", auth, createJob);

export default router;