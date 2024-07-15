import HTTPStatusCodes from "http-status-codes";
import { NextFunction, Response } from "express";
import * as TodoService from "../services/todos.service";
import { Request } from "../interfaces/auth.interface";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";

const createTodos = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;

    const user = req.user;

    if ([body.title, body.completed].some((field) => field?.trim === "")) {
      return res.status(422).json({ message: "all fields are required" });
    }

    const createdTodo = TodoService.createTodos(body, user!.id);
    if (createdTodo === undefined) {
      throw new Error("todo creation failed");
    }

    return res
      .status(HTTPStatusCodes.CREATED)
      .json({ message: "todos created", data: createdTodo });
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};

const getTodos = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    const todos = TodoService.getTodos(user!.id);

    if (todos === undefined) {
      throw new Error("cannot get todos");
    }

    return res.status(HTTPStatusCodes.OK).json(todos);
  } catch (error) {
    if (error instanceof Error) {
      next(new NotFoundError(error.message));
    }
  }
};

const getTodoById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    const todoId = req.params.id;

    const todo = TodoService.getTodoById(todoId.toString(), user!.id);

    if (todo === undefined) {
      throw new Error(`Todo with id: ${todoId} doesnt exist`);
    }
    return res.status(HTTPStatusCodes.OK).json(todo);
  } catch (error) {
    if (error instanceof Error) {
      next(new NotFoundError(error.message));
    }
  }
};

const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    const todoId = req.params.id;

    const isDeleted = TodoService.deleteTodoById(todoId, user!.id);

    if (!isDeleted) {
      return next(new BadRequestError(`Todo with id: ${todoId} doesnt exist`));
    }
    return res
      .status(HTTPStatusCodes.OK)
      .json({ message: "todo deletion successful" });
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

const updateTodo = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    const todoId = req.params.id;
    const { body } = req;
    const isUpdated = TodoService.updateTodoById(todoId, body, user!.id);

    if (!isUpdated) {
      throw new Error("updation failed");
    }

    return res
      .status(HTTPStatusCodes.OK)
      .json({ message: "todo updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};

export { createTodos, getTodos, getTodoById, deleteTodo, updateTodo };
