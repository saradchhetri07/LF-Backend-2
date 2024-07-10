import express from "express";
import {
  createTodos,
  getTodos,
  getTodoById,
  deleteTodo,
  updateTodo,
} from "../controllers/todos.controllers";
import { auth } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(auth);

router.get("/", getTodos);
router.post("/", createTodos);
router.get("/:id", getTodoById);
router.delete("/:id", deleteTodo);
router.put("/:id", updateTodo);

export default router;
