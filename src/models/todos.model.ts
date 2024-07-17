import { Todo } from "../interfaces/todos.interface";
import { BaseModel } from "./base";

export let todos: Todo[] = [
  {
    title: "make coffee",
    completed: false,
    id: "1",
    userId: "2",
    createdAt: new Date("2024-07-15T01:37:35.139Z"),
    updatedAt: new Date("2024-07-15T01:37:35.139Z"),
  },
];

export class TodoModel extends BaseModel {
  static async createTodo(todo: Pick<Todo, "title" | "completed">, id: string) {
    const todoToCreate = {
      title: todo.title,
      completed: todo.completed,
      createdBy: id,
    };
    const todoCreated = this.queryBuilder().insert(todoToCreate).table("todos");

    await todoCreated;
  }

  static async getTodos(userId: string) {
    const todos = this.queryBuilder()
      .table("users")
      .select("users.name", "todos.id", "todos.title", "todos.completed")
      .leftJoin("todos", "users.id", "todos.created_by")
      .where({ "todos.created_by": userId });

    return await todos;
  }

  static async deleteTodo(todoId: string, userId: string) {
    const deletedTodo = this.queryBuilder()
      .table("todos")
      .where({ "todos.id": todoId, "todos.created_by": userId })
      .del();
    return await deletedTodo;
  }

  static async updateTodo(
    todo: Partial<Pick<Todo, "title" | "completed">>,
    todoId: string,
    userId: string
  ) {
    const updatedTodo = this.queryBuilder()
      .update(todo)
      .table("todos")
      .where({ id: todoId, createdBy: userId });
    console.log(`updated todo is`, await updatedTodo);

    return await updatedTodo;
  }
}

/**
 * Retrieves the list of all todos.
 * @returns {Todo[]} Array of todos.
 */
const getTodos = (userId: string): Todo[] => {
  const newTodos: Todo[] = [];
  todos.forEach((todo: Todo) => {
    if (todo.userId === userId) {
      newTodos.push(todo);
    }
  });
  return newTodos;
};

/**
 * Creates a new todo and adds it to the list.
 * @param {Todo} todo - The todo to be added.
 * @returns {Todo[]} Updated array of todos.
 */
const createTodos = (
  title: string,
  completed: boolean,
  userId: string
): Todo => {
  let todosLength = todos.length;
  const newTodo = {
    title: title,
    completed: completed,
    id: `${todosLength + 1}`,
    userId: userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  todos.push(newTodo);

  return newTodo;
};

/**
 * Retrieves a todo by its ID.
 * @param {string} id - The ID of the todo to retrieve.
 * @returns {Todo | undefined} The todo with the given ID, or undefined if not found.
 */
const getTodoById = (id: string, userId: string): Todo | undefined => {
  return todos.find(
    ({ id: todoId, userId: userId }) => id === todoId && userId === userId
  );
};

/**
 * Deletes a todo by its ID.
 * @param {string} id - The ID of the todo to delete.
 * @returns {boolean} True if the todo was deleted, false otherwise.
 */
const deleteTodoById = (id: string, userId: string): boolean => {
  const initialLength = todos.length;
  const newTodos = todos.filter(
    (todo) => todo.id !== id && todo.userId === userId
  );
  todos = newTodos;

  return initialLength !== newTodos.length;
};

/**
 * Updates a todo by its ID.
 * @param {string} id - The ID of the todo to update.
 * @param {string | undefined} newtitle - The new title for the todo, or undefined to keep the current title.
 * @param {boolean | undefined} newcompleted - The new completed status for the todo, or undefined to keep the current status.
 * @returns {boolean} True if the todo was updated, false otherwise.
 */
const updateTodoById = (
  id: string,
  body: Partial<Pick<Todo, "title" | "completed">>,
  userId: string
): boolean => {
  let isChanged: boolean = false;
  const { title, completed } = body;

  todos = todos.map((todo) => {
    if (todo.id === id && todo.userId === userId) {
      isChanged = true;
      return {
        ...todo, //spread the current todo properties
        title: title !== undefined ? title : todo.title, // Update title if provided
        completed: completed !== undefined ? completed : todo.completed, // Update completed if provided
        updatedAt:
          title !== undefined || completed !== undefined
            ? new Date()
            : todo.updatedAt,
      };
    }
    return todo;
  });
  return isChanged;
};

export { getTodos, createTodos, getTodoById, deleteTodoById, updateTodoById };
