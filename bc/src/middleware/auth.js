import jwt from "jsonwebtoken";

export const auth = (req, _res, next) => {
  const hdr = req.headers.authorization || "";
  const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
  if (!token) return next({ status: 401, message: "No token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    next({ status: 401, message: "Invalid token" });
  }
};
