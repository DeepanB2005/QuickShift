import { Router } from "express";
import { register, login, googleOAuth, me, updateMe } from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.js";
import User from "../models/User.js";

const router = Router();

router.post("/register", register);   // body: name, email, password, location, role, phone
router.post("/login", login);         // body: email, password
router.post("/google", googleOAuth);  // body: credential (Google ID token)
router.get("/me", auth, me);          // bearer JWT
router.patch("/me", auth, updateMe);

export default router;
