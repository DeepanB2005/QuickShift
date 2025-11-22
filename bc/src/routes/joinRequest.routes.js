import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
  applyJoinRequest,
  getRequestsForUser,
  getRequestsForWorker,
  updateRequestStatus
} from "../controllers/joinRequest.controller.js";
import JoinRequest from "../models/JoinRequest.js";

const router = Router();

router.post("/", auth, applyJoinRequest); // worker applies
router.get("/user", auth, getRequestsForUser); // user sees requests for their jobs
router.get("/worker", auth, getRequestsForWorker); // worker sees their requests
router.patch("/:id", auth, updateRequestStatus); // user accepts/rejects

// PATCH /api/join-requests/:id/rate
router.patch("/:id/rate", auth, async (req, res) => {
  // ...same as your joinRequests.js PATCH code...
});

// POST /api/join-requests/worker-ratings
router.post("/worker-ratings", async (req, res) => {
  // ...same as your joinRequests.js POST code...
});

export default router;