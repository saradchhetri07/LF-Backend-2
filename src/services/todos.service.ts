import { Todo } from "../interfaces/todos.interface";
import * as TodoModel from "../models/todos.model";
import loggerWithNameSpace from "../utils/logger";

export const logger = loggerWithNameSpace("TodoService");

/**
 * Retrieves the list of all todos for a specific user.
 * @param {string} userId - The ID of the user whose todos are to be retrieved.
 * @returns {Todo[]} Array of todos belonging to the user.
 */
const getTodos = async (userId: string) => {
  logger.info(`Fetching todos for user with ID: ${userId}`);
  return TodoModel.TodoModel.getTodos(userId);
};

/**
 * Creates a new todo and adds it to the list.
 * @param {Pick<Todo, "title" | "completed">} body - The todo details (title and completion status).
 * @param {string} id - The ID of the user creating the todo.
 * @returns {Todo[]} Updated array of todos after addition.
 */
const createTodos = (todo: Pick<Todo, "title" | "completed">, id: string) => {
  logger.info(`Creating new todo with title: ${todo.title}`);
  return TodoModel.TodoModel.createTodo(todo, id);
};

/**
 * Retrieves a todo by its ID for a specific user.
 * @param {string} id - The ID of the todo to retrieve.
 * @param {string} userId - The ID of the user who owns the todo.
 * @returns {Todo | undefined} The todo with the given ID, or undefined if not found.
 */
const getTodoById = (id: string, userId: string): Todo | undefined => {
  logger.info(`Fetching todo with ID: ${id} for user with ID: ${userId}`);
  return TodoModel.getTodoById(id, userId);
};

/**
 * Deletes a todo by its ID for a specific user.
 * @param {string} id - The ID of the todo to delete.
 * @param {string} userId - The ID of the user who owns the todo.
 * @returns {boolean} True if the todo was successfully deleted, false otherwise.
 */
const deleteTodoById = async (id: string, userId: string) => {
  logger.info(`Deleting todo with ID: ${id} for user with ID: ${userId}`);
  return TodoModel.TodoModel.deleteTodo(id, userId);
};

/**
 * Updates a todo by its ID with new title and completion status for a specific user.
 * @param {string} id - The ID of the todo to update.
 * @param {Partial<Pick<Todo, "title" | "completed">>} body - The new title and completion status for the todo.
 * @param {string} userId - The ID of the user who owns the todo.
 * @returns {boolean} True if the todo was successfully updated, false otherwise.
 */
const updateTodoById = async (
  id: string,
  body: Partial<Pick<Todo, "title" | "completed">>,
  userId: string
) => {
  logger.info(`Updating todo with ID: ${id} for user with ID: ${userId}`);
  return TodoModel.TodoModel.updateTodo(body, id, userId);
};

export { getTodos, createTodos, getTodoById, deleteTodoById, updateTodoById };
