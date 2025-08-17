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
    googleId: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
