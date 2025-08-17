import { Router } from "express";
import { register, login, googleOAuth, me } from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);   // body: name, email, password, location, role, phone
router.post("/login", login);         // body: email, password
router.post("/google", googleOAuth);  // body: credential (Google ID token)
router.get("/me", auth, me);          // bearer JWT

export default router;
