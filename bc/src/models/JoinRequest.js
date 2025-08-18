import mongoose from "mongoose";

const JoinRequestSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  worker: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("JoinRequest", JoinRequestSchema);