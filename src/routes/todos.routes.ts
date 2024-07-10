import express from "express";
import {
  createTodos,
  getTodos,
  getTodoById,
  deleteTodo,
  updateTodo,
} from "../controllers/todos.controllers";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(authenticate);

router.get("/", authorize("users.get"), getTodos);
router.post("/", authorize("users.create"), createTodos);
router.get("/:id", authorize("users.get"), getTodoById);
router.delete("/:id", authorize("users.delete"), deleteTodo);
router.put("/:id", authorize("users.update"), updateTodo);

export default router;
