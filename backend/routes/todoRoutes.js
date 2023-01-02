import express from "express";
const router = express.Router();
import { getTodos, setTodo, updateTodo, deleteTodo } from "../controllers/todoCtrl.js";

router.get("/", getTodos);
router.post("/", setTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;