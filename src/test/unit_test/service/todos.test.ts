import sinon from "sinon";
import expect from "expect";
import {
  createTodos,
  getTodoById,
  deleteTodoById,
  updateTodoById,
  getTodos,
} from "../../../services/todos.service";
import * as TodoModel from "../../../models/todos.model";

import { logger } from "../../../services/todos.service";
import { Todo } from "../../../interfaces/todos.interface";

describe("Todo service test", () => {
  describe("TodoService.createTodos", () => {
    let todoModelCreateTodosStub: sinon.SinonStub;
    let loggerInfoStub: sinon.SinonStub;

    beforeEach(() => {
      todoModelCreateTodosStub = sinon.stub(TodoModel, "createTodos");
      loggerInfoStub = sinon.stub(logger, "info");
    });

    afterEach(() => {
      todoModelCreateTodosStub.restore();
      loggerInfoStub.restore();
    });

    it("should call TodoModel.createTodos with the correct parameters", () => {
      const todoData = { title: "New Todo", completed: false };
      const userId = "1";
      const createdTodos = [
        {
          title: "New Todo",
          completed: false,
          id: "1",
          userId: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      todoModelCreateTodosStub.returns(createdTodos);

      const result = createTodos(todoData, userId);

      expect(loggerInfoStub.callCount).toBe(1);
      expect(
        loggerInfoStub.calledWith(
          `Creating new todo with title: ${todoData.title}`
        )
      ).toBe(true);
      expect(todoModelCreateTodosStub.calledOnce).toBe(true);
      expect(
        todoModelCreateTodosStub.calledWith(
          todoData.title,
          todoData.completed,
          userId
        )
      ).toBe(true);
      expect(result).toEqual(createdTodos);
    });
  });

  describe("getTodoById service", () => {
    let todoModelGetTodoByIdStub: sinon.SinonStub;
    let loggerInfoStub: sinon.SinonStub;

    beforeEach(() => {
      todoModelGetTodoByIdStub = sinon.stub(TodoModel, "getTodoById");
      loggerInfoStub = sinon.stub(logger, "info");
    });

    afterEach(() => {
      todoModelGetTodoByIdStub.restore();
      loggerInfoStub.restore();
    });

    it("should call TodoModel.getTodoById with the correct parameters", () => {
      const todoId = "1";
      const userId = "1";

      const todo = {
        title: "New Todo",
        completed: false,
        id: todoId,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      todoModelGetTodoByIdStub.returns(todo);

      const result = getTodoById(todoId, userId);

      // Ensure logger.info was called once
      expect(loggerInfoStub.callCount).toBe(1);
      // Ensure logger.info was called with the correct message
      expect(
        loggerInfoStub.calledWith(
          `Fetching todo with ID: ${todoId} for user with ID: ${userId}`
        )
      ).toBe(true);

      // Ensure TodoModel.getTodoById was called once with correct parameters
      expect(todoModelGetTodoByIdStub.calledOnce).toBe(true);
      expect(todoModelGetTodoByIdStub.calledWith(todoId, userId)).toBe(true);

      // Ensure the function returns the correct todo
      expect(result).toEqual(todo);
    });

    it("should return undefined if TodoModel.getTodoById returns undefined", () => {
      const todoId = "2";
      const userId = "1";

      todoModelGetTodoByIdStub.returns(undefined);

      const result = getTodoById(todoId, userId);

      // Ensure logger.info was called once
      expect(loggerInfoStub.callCount).toBe(1);
      // Ensure logger.info was called with the correct message
      expect(
        loggerInfoStub.calledWith(
          `Fetching todo with ID: ${todoId} for user with ID: ${userId}`
        )
      ).toBe(true);

      // Ensure TodoModel.getTodoById was called once with correct parameters
      expect(todoModelGetTodoByIdStub.calledOnce).toBe(true);
      expect(todoModelGetTodoByIdStub.calledWith(todoId, userId)).toBe(true);

      // Ensure the function returns undefined
      expect(result).toBeUndefined();
    });
  });

  describe("deleteTodoById service", () => {
    let todoModelDeleteTodoByIdStub: sinon.SinonStub;
    let loggerInfoStub: sinon.SinonStub;

    beforeEach(() => {
      todoModelDeleteTodoByIdStub = sinon.stub(TodoModel, "deleteTodoById");
      loggerInfoStub = sinon.stub(logger, "info");
    });

    afterEach(() => {
      todoModelDeleteTodoByIdStub.restore();
      loggerInfoStub.restore();
    });

    it("should call TodoModel.deleteTodoById with the correct parameters", () => {
      const todoId = "1";
      const userId = "1";

      todoModelDeleteTodoByIdStub.returns(true);

      const result = deleteTodoById(todoId, userId);

      // Ensure logger.info was called once
      expect(loggerInfoStub.callCount).toBe(1);
      // Ensure logger.info was called with the correct message
      expect(
        loggerInfoStub.calledWith(
          `Deleting todo with ID: ${todoId} for user with ID: ${userId}`
        )
      ).toBe(true);

      // Ensure TodoModel.deleteTodoById was called once with correct parameters
      expect(todoModelDeleteTodoByIdStub.calledOnce).toBe(true);

      expect(todoModelDeleteTodoByIdStub.calledWith(todoId, userId)).toBe(true);

      // Ensure the function returns true
      expect(result).toBe(true);
    });

    it("should return false if TodoModel.deleteTodoById returns false", () => {
      const todoId = "2";
      const userId = "1";

      todoModelDeleteTodoByIdStub.returns(false);

      const result = deleteTodoById(todoId, userId);

      // Ensure logger.info was called once
      expect(loggerInfoStub.callCount).toBe(1);
      // Ensure logger.info was called with the correct message
      expect(
        loggerInfoStub.calledWith(
          `Deleting todo with ID: ${todoId} for user with ID: ${userId}`
        )
      ).toBe(true);

      // Ensure TodoModel.deleteTodoById was called once with correct parameters
      expect(todoModelDeleteTodoByIdStub.calledOnce).toBe(true);

      expect(todoModelDeleteTodoByIdStub.calledWith(todoId, userId)).toBe(true);

      // Ensure the function returns false
      expect(result).toBe(false);
    });
  });

  describe("updateTodoById", () => {
    let todoModelUpdateTodoByIdStub: sinon.SinonStub;
    let loggerInfoStub: sinon.SinonStub;

    beforeEach(() => {
      todoModelUpdateTodoByIdStub = sinon.stub(TodoModel, "updateTodoById");
      loggerInfoStub = sinon.stub(logger, "info");
    });

    afterEach(() => {
      todoModelUpdateTodoByIdStub.restore();
      loggerInfoStub.restore();
    });

    it("should update a todo and return true when the todo is successfully updated", () => {
      const id = "1";
      const body = { title: "Updated Title", completed: true };
      const userId = "1";

      todoModelUpdateTodoByIdStub.returns(true);

      const result = updateTodoById(id, body, userId);

      expect(loggerInfoStub.callCount).toBe(1);
      expect(loggerInfoStub.getCall(0).args).toEqual([
        `Updating todo with ID: ${id} for user with ID: ${userId}`,
      ]);

      expect(todoModelUpdateTodoByIdStub.callCount).toBe(1);
      expect(todoModelUpdateTodoByIdStub.getCall(0).args).toEqual([
        id,
        body,
        userId,
      ]);

      expect(result).toBe(true);
    });

    it("should return false when the todo is not found or not updated", () => {
      const id = "2";
      const body = { title: "Non-existent Title", completed: false };
      const userId = "1";

      todoModelUpdateTodoByIdStub.returns(false);

      const result = updateTodoById(id, body, userId);

      expect(loggerInfoStub.callCount).toBe(1);
      expect(loggerInfoStub.getCall(0).args).toEqual([
        `Updating todo with ID: ${id} for user with ID: ${userId}`,
      ]);

      expect(todoModelUpdateTodoByIdStub.callCount).toBe(1);
      expect(todoModelUpdateTodoByIdStub.getCall(0).args).toEqual([
        id,
        body,
        userId,
      ]);

      expect(result).toBe(false);
    });
  });

  describe("getTodos", () => {
    let todoModelGetTodosStub: sinon.SinonStub;
    let loggerInfoStub: sinon.SinonStub;

    beforeEach(() => {
      todoModelGetTodosStub = sinon.stub(TodoModel, "getTodos");
      loggerInfoStub = sinon.stub(logger, "info");
    });

    afterEach(() => {
      todoModelGetTodosStub.restore();
      loggerInfoStub.restore();
    });

    it("should fetch todos for logged in user", () => {
      const userId = "1";
      const todos = [
        {
          id: "1",
          title: "Test Todo 1",
          completed: false,
          userId: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          title: "Test Todo 2",
          completed: true,
          userId: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      todoModelGetTodosStub.returns(todos);

      const result = getTodos(userId);

      expect(loggerInfoStub.callCount).toBe(1);
      expect(loggerInfoStub.getCall(0).args).toEqual([
        `Fetching todos for user with ID: ${userId}`,
      ]);

      expect(todoModelGetTodosStub.callCount).toBe(1);
      expect(todoModelGetTodosStub.getCall(0).args).toEqual([userId]);

      expect(result).toEqual(todos);
    });

    it("should return an empty array if no todos are found for the given user ID", () => {
      const userId = "2";
      const todos: Todo[] = [];

      todoModelGetTodosStub.returns(todos);

      const result = getTodos(userId);

      expect(loggerInfoStub.callCount).toBe(1);
      expect(loggerInfoStub.getCall(0).args).toEqual([
        `Fetching todos for user with ID: ${userId}`,
      ]);

      expect(todoModelGetTodosStub.callCount).toBe(1);
      expect(todoModelGetTodosStub.getCall(0).args).toEqual([userId]);

      expect(result).toEqual(todos);
    });
  });
});
