import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import jobRoutes from "./routes/job.routes.js";
import joinRequestRoutes from "./routes/joinRequest.routes.js";
import translateRoutes from "./translate.js";

dotenv.config();
const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: false
}));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use(limiter);

app.get("/", (_req, res) => res.send("QuickShift API is running"));
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/join-requests", joinRequestRoutes);
app.use("/translate", translateRoutes);

// global error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Server Error" });
});

connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
});
