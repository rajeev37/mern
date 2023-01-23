import express from "express";
const router = express.Router();
import { getAllUser, getUser } from "../controllers/userCtrl.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
router.get("/users", verifyToken, verifyRoles(global.ROLES.Admin), getAllUser);
router.get("/user", verifyToken, getUser);

export default router;