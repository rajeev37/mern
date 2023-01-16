import express from "express";
const router = express.Router();
import { signUp, signIn, refreshToken, logout } from "../controllers/authCtrl.js";

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.get("/refresh", refreshToken);
router.post("/logout", logout);

export default router;