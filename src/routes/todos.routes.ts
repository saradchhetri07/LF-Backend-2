import express from "express";
import {
  createTodos,
  getTodos,
  getTodoById,
  deleteTodo,
  updateTodo,
} from "../controllers/todos.controllers";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { validateReqBody } from "../middlewares/validator";
import {
  createTodoBodySchema,
  getTodoQuerySchema,
  updateTodoBodySchema,
} from "../schema/todo.schema";

const router = express.Router();
router.use(express.json());

router.use(authenticate);

router.get("/", authorize("users.get"), getTodos);
router.post(
  "/",
  authorize("users.create"),
  validateReqBody(createTodoBodySchema),
  createTodos
);
router.get(
  "/:id",
  authorize("users.get"),
  validateReqBody(getTodoQuerySchema),
  getTodoById
);
router.delete(
  "/:id",
  authorize("users.delete"),
  validateReqBody(getTodoQuerySchema),
  deleteTodo
);
router.put(
  "/:id",
  authorize("users.update"),
  validateReqBody(getTodoQuerySchema),
  validateReqBody(updateTodoBodySchema),
  updateTodo
);

export default router;
