import { Router } from "express";
import { register, login, googleOAuth, me } from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.js";
import User from "../models/User.js";

const router = Router();

router.post("/register", register);   // body: name, email, password, location, role, phone
router.post("/login", login);         // body: email, password
router.post("/google", googleOAuth);  // body: credential (Google ID token)
router.get("/me", auth, me);          // bearer JWT
router.patch("/me", auth, async (req, res, next) => {
  try {
    const updates = (({ name, location, phone, role }) => ({ name, location, phone, role }))(req.body);
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.json({ user });
  } catch (err) {
    next(err);
  }
});

export default router;
