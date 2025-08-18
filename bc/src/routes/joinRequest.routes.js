import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
  applyJoinRequest,
  getRequestsForUser,
  getRequestsForWorker,
  updateRequestStatus
} from "../controllers/joinRequest.controller.js";

const router = Router();

router.post("/", auth, applyJoinRequest); // worker applies
router.get("/user", auth, getRequestsForUser); // user sees requests for their jobs
router.get("/worker", auth, getRequestsForWorker); // worker sees their requests
router.patch("/:id", auth, updateRequestStatus); // user accepts/rejects

export default router;