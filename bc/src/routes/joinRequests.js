import express from "express";
import JoinRequest from "../models/JoinRequest.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// ...existing routes...

// PATCH /api/join-requests/:id/rate
router.patch("/:id/rate", auth, async (req, res) => {
  try {
    const { rating } = req.body;
    if (typeof rating !== "number" || rating < 1 || rating > 10) {
      return res.status(400).json({ error: "Invalid rating" });
    }
    const joinRequest = await JoinRequest.findById(req.params.id);
    if (!joinRequest) return res.status(404).json({ error: "Join request not found" });

    // Only allow rating if accepted and not already rated
    if (joinRequest.status !== "accepted") {
      return res.status(400).json({ error: "Can only rate accepted requests" });
    }
    if (typeof joinRequest.rating === "number") {
      return res.status(400).json({ error: "Already rated" });
    }

    joinRequest.rating = rating;
    await joinRequest.save();
    res.json({ success: true, rating });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/worker-ratings", async (req, res) => {
  try {
    const { workerIds } = req.body;
    if (!Array.isArray(workerIds)) return res.json({});
    const ratings = await Promise.all(
      workerIds.map(async (workerId) => {
        const rated = await JoinRequest.find({ worker: workerId, rating: { $gte: 1 } });
        if (!rated.length) return [workerId, null];
        const avg = rated.reduce((sum, r) => sum + r.rating, 0) / rated.length;
        return [workerId, avg];
      })
    );
    res.json(Object.fromEntries(ratings));
  } catch {
    res.json({});
  }
});

export default router;