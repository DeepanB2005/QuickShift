import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobName: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  date: { type: Date, required: true },
  wageMin: { type: Number, required: true },
  wageMax: { type: Number, required: true },
  requirements: [{ type: String }],
  latitude: { type: Number, required: true },    // <-- Add this line
  longitude: { type: Number, required: true },   // <-- Add this line
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Job", JobSchema);