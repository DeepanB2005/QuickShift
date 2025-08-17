import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";

const SALT_ROUNDS = 10;
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signToken = (user) =>
  jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });

export const register = async (req, res, next) => {
  try {
    const {
      name, email, password, location, role, phone,
      age, skills, experience, wageMin, wageMax, availability, description
    } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already registered" });

    const existsPhone = await User.findOne({ phone });
    if (existsPhone) {
      return res.status(409).json({ message: "Phone number already registered" });
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      name,
      email,
      password: hash,
      location: location || "",
      role,
      phone: phone || "",
      provider: "local",
      age,
      skills: role === "worker" ? skills : [],
      experience: role === "worker" ? experience : undefined,
      wageMin: role === "worker" ? wageMin : undefined,
      wageMax: role === "worker" ? wageMax : undefined,
      availability: role === "worker" ? availability : [],
      description: role === "worker" ? description : ""
    });

    const token = signToken(user);
    res.status(201).json({
      token,
      user: {
        id: user._id, name: user.name, email: user.email, role: user.role,
        location: user.location, phone: user.phone, age: user.age,
        skills: user.skills, experience: user.experience,
        wageMin: user.wageMin, wageMax: user.wageMax,
        availability: user.availability, description: user.description
      }
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.provider !== "local")
      return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password || "");
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, location: user.location, phone: user.phone } });
  } catch (err) {
    next(err);
  }
};

export const googleOAuth = async (req, res, next) => {
  try {
    const { credential } = req.body; // Google ID token from front-end
    if (!credential) return res.status(400).json({ message: "Missing credential" });

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: name || "Google User",
        email,
        provider: "google",
        googleId
      });
    }

    const token = signToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, location: user.location, phone: user.phone } });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/auth/me
export const updateMe = async (req, res, next) => {
  try {
    const updates = req.body;
    // Only allow updating allowed fields
    const allowed = [
      "name", "location", "phone", "age", "skills", "experience",
      "wageMin", "wageMax", "availability", "description", "role"
    ];
    const updateData = {};
    allowed.forEach((key) => {
      if (updates[key] !== undefined) updateData[key] = updates[key];
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password").lean(); // <-- ensure plain object

    res.json({ user });
  } catch (err) {
    next(err);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (err) {
    next(err);
  }
};
