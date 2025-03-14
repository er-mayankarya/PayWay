import { JWT_USER_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token, JWT_USER_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

export default {
    authMiddleware
}