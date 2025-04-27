import jwt from "jsonwebtoken";
import { JWT_USER_SECRET } from "./config.js";

export function authMiddleware(req, res, next) {
  const token = req.headers.token;

  try {
    const decoded = jwt.verify(token, JWT_USER_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(403).send({
      message: "Error in Authnetication",
    });
  }
}
