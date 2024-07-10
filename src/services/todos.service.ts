import { Todo } from "../interfaces/todos.interface";
import * as TodoModel from "../models/todos.model";

/**
 * Retrieves the list of all todos.
 * @returns {Todo[]} Array of todos.
 */
const getTodos = (userId: string): Todo[] => {
  return TodoModel.getTodos(userId);
};

/**
 * Creates a new todo and adds it to the list.c
 * @param {Todo} todo - The todo to be added.
 * @returns {Todo[]} Updated array of todos.
 */
const createTodos = (
  body: Pick<Todo, "title" | "completed">,
  id: string
): Todo[] => {
  const createdTodo = TodoModel.createTodos(body.title, body.completed, id);
  return createdTodo;
};

/**
 * Retrieves a todo by its ID.
 * @param {string} id - The ID of the todo to retrieve.
 * @returns {Todo | undefined} The todo with the given ID, or undefined if not found.
 */
const getTodoById = (id: string, userId: string): Todo | undefined => {
  return TodoModel.getTodoById(id, userId);
};

/**
 * Deletes a todo by its ID.
 * @param {string} id - The ID of the todo to delete.
 * @returns {boolean} True if the todo was deleted, false otherwise.
 */
const deleteTodoById = (id: string, userId: string): boolean => {
  return TodoModel.deleteTodoById(id, userId);
};

/**
 * Updates a todo by its ID with a new title and completion status.
 * @param {string} id - The ID of the todo to update.
 * @param {string} title - The new title for the todo.
 * @param {boolean} completed - The new completed status for the todo.
 * @returns {boolean} True if the todo was updated, false otherwise.
 */
const updateTodoById = (
  id: string,
  title: string,
  completed: boolean
): boolean => {
  return TodoModel.updateTodoById(id, title, completed);
};

export { getTodos, createTodos, getTodoById, deleteTodoById, updateTodoById };
