import express from "express";
const router = express.Router();
import { getAllUser, getUser, signUp, signIn, refreshToken, logout } from "../controllers/userCtrl.js";
import { verifyToken } from "../middleware/verifyToken.js";

router.get("/users", getAllUser);
router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.get("/user", verifyToken, getUser);
router.get("/refresh", refreshToken, verifyToken, getUser);
router.post("/logout", verifyToken, logout);

export default router;