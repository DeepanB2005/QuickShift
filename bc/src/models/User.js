import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String }, // optional for Google users
    location: { type: String, default: "" },
    role: { type: String, enum: ["user", "worker"], default: "user" },
    phone: { type: String, trim: true, unique: true },
    provider: { type: String, enum: ["local", "google"], default: "local" },
    googleId: { type: String },
    age: { type: Number, min: 16, max: 100 },
    skills: [{ type: String }],
    experience: { type: Number, min: 0, max: 80 },
    wageMin: { type: Number, min: 0 },
    wageMax: { type: Number, min: 0 },
    availability: [{ type: String }],
    description: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);