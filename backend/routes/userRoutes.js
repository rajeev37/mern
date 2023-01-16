import express from "express";
const router = express.Router();
import { getAllUser, getUser } from "../controllers/userCtrl.js";
import { verifyToken } from "../middleware/verifyToken.js";

router.get("/users", getAllUser);
router.get("/user", verifyToken, getUser);

export default router;