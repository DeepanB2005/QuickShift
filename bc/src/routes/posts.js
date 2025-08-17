// routes/posts.js
import { Router } from "express";
import auth from "../middleware/auth.js";
import Post from "../models/Post.js";

const router = Router();

// Create post (user)
router.post("/", auth, async (req, res) => {
  const { title, description, city } = req.body;
  const post = await Post.create({
    title, description, city, createdBy: req.user.id
  });
  res.status(201).json({ post });
});

// My posts (user)
router.get("/mine", auth, async (req, res) => {
  const posts = await Post.find({ createdBy: req.user.id }).sort("-createdAt");
  res.json({ posts });
});

// Open posts (visible for workers)
router.get("/open", auth, async (req, res) => {
  const posts = await Post.find({ status: "open" }).sort("-createdAt");
  res.json({ posts });
});

export default router;
