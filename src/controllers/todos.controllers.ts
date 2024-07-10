import { log } from "console";
import e, { Request, Response } from "express";
import * as TodoService from "../services/todos.service";
import { JwtPayload } from "jsonwebtoken";
import { Todo } from "../interfaces/todos.interface";
import { CustomRequest } from "../interfaces/user.interface";

const createTodos = (req: CustomRequest, res: Response) => {
  const { body } = req;

  const user = req.user;

  //Check if user is authenticated
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if ([body.title, body.completed].some((field) => field?.trim === "")) {
    return res.status(422).json({ message: "all fields are required" });
  }

  TodoService.createTodos(body, user.id);
  res.status(201).json({ message: "todos created" });
};

const getTodos = (req: CustomRequest, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const todos = TodoService.getTodos(user.id);
  res.status(200).json(todos);
};

const getTodoById = (req: CustomRequest, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const todoId = req.params.id;

  const todo = TodoService.getTodoById(todoId.toString(), user.id);

  res.status(200).json({ message: todo });
};

const deleteTodo = (req: CustomRequest, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const todoId = req.params.id;

  const isDeleted = TodoService.deleteTodoById(todoId, user.id);
  if (!isDeleted) {
    return res.status(404).json({ message: "deletion failed" });
  }
  res.status(200).json({ message: "todo deletion successful" });
};

const updateTodo = (req: Request, res: Response) => {
  const todoId = req.params.id;
  let { title, completed } = req.body;

  const isUpdated = TodoService.updateTodoById(todoId, title, completed);

  if (!isUpdated) {
    return {
      error: "updation failed",
    };
  }

  res.status(200).json({ message: "todo updated successfully" });
};

export { createTodos, getTodos, getTodoById, deleteTodo, updateTodo };
