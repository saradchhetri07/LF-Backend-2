import express from "express";
import request from "supertest";
import expect from "expect";
import HttpStatusCodes from "http-status-codes";
import { JwtPayload, verify } from "jsonwebtoken";
import router from "../../../routes/index.routes";
import config from "../../../config";
import { todos } from "../../../models/todos.model";
import { UserInterface } from "../../../interfaces/user.interface";

const { test, jwt } = config;

describe("Service Integration Test Suite", () => {
  const app = express();

  app.use(router);
  app.use(express.json());
  //   app.use(NotFoundError);
  //   app.use(genericErrorHandler);

  describe("getTodos", () => {
    it("should return all todos created by logged in user", async () => {
      const response = await request(app)
        .get("/todos")
        .set("Authorization", `Bearer ${test.accessToken}`)
        .expect(HttpStatusCodes.OK);

      const user = verify(test.accessToken, jwt.secret) as UserInterface;

      const expectedOutput = todos
        .filter((todo) => todo.userId === user.id)
        .map((todo) => ({
          ...todo,
          createdAt: todo.createdAt.toISOString(),
          updatedAt: todo.updatedAt.toISOString(),
        }));

      expect(response.body).toStrictEqual(expectedOutput);
    });
  });

  describe("getTodoById", () => {
    it("should return todos by id", async () => {
      const id = "1";
      const response = await request(app)
        .get(`/todos/${id}`)
        .set("Authorization", `Bearer ${test.accessToken}`)
        .expect(HttpStatusCodes.OK);

      const user = verify(test.accessToken, jwt.secret) as UserInterface;

      const expectedOutput = todos
        .filter(({ id: todoId, userId }) => todoId === id && userId === user.id)
        .map((todo) => ({
          ...todo,
          createdAt: todo.createdAt.toISOString(),
          updatedAt: todo.updatedAt.toISOString(),
        }))[0]; // [0] to get the single expected todo

      expect(response.body).toStrictEqual(expectedOutput);
    });

    it("should return 404 not found if id is not found", async () => {
      const id = "10";

      const response = await request(app)
        .get(`/todos/${id}`)
        .set("Authorization", `Bearer ${test.accessToken}`)
        .expect(HttpStatusCodes.NOT_FOUND);

      expect(response.body.message).toBe(`Todo with id: ${id} doesnt exist`);
    });
  });

  describe("createTodo", () => {
    it("should create new Todo", async () => {
      const todoBody = {
        title: "wash car",
        completed: "false",
      };

      const response = await request(app)
        .post("/todos")
        .set("Authorization", `Bearer ${test.accessToken}`)
        .send(todoBody)
        .expect(HttpStatusCodes.CREATED);

      expect(response.body.message).toBe("todos created");
      expect(response.body.data.title).toBe(todoBody.title);
      expect(response.body.data.completed.toString()).toBe(todoBody.completed);
    });

    //     //     it("should return 401 unauthorized if not authenticated", async () => {
    //     //       const todoBody = {
    //     //         todo: "test",
    //     //         dueDate: "2024-06-09",
    //     //         status: "incomplete",
    //     //       };
    //     //       await request(app)
    //     //         .post("/todos")
    //     //         .send(todoBody)
    //     //         .expect(HttpStatusCodes.UNAUTHORIZED);
    //     //     });
    //     //   });

    //     //   describe("updateTodo", () => {
    //     //     it("should update the todo", async () => {
    //     //       const id = "3";
    //     //       const userBody = {
    //     //         status: "incomplete",
    //     //         dueDate: "2024-09-25",
    //     //       };
    //     //       const dataToBeUpdated = todos.find(({ id: todoId }) => todoId === id);

    //     //       const response = await request(app)
    //     //         .put(`/todos/${id}`)
    //     //         .set("Authorization", `Bearer ${test.accessToken}`)
    //     //         .send(userBody)
    //     //         .expect(HttpStatusCodes.OK);

    //     //       const expectedOutput = { ...dataToBeUpdated, ...userBody };

    //     //       expect(response.body.todo).toBe(expectedOutput.todo);
    //     //       expect(response.body.id).toBe(expectedOutput.id);
    //     //       expect(response.body.status).toBe(expectedOutput.status);
    //     //       expect(response.body.createdBy).toBe(expectedOutput.createdBy);
    //     //     });

    //     //     it("should return 400 Bad Request if id is not found", async () => {
    //     //       const id = "10";
    //     //       const userBody = {
    //     //         status: "incomplete",
    //     //         dueDate: "2024-09-25",
    //     //       };
    //     //       const response = await request(app)
    //     //         .put(`/todos/${id}`)
    //     //         .set("Authorization", `Bearer ${test.accessToken}`)
    //     //         .send(userBody)
    //     //         .expect(HttpStatusCodes.BAD_REQUEST);

    //     //       expect(response.body.message).toBe(`Todo with id: ${id} doesnt exist`);
    //     //     });

    //     //     it("should return 401 unauthorized if not authenticated", async () => {
    //     //       const todoBody = {
    //     //         todo: "test",
    //     //         dueDate: "2024-06-09",
    //     //         status: "incomplete",
    //     //       };
    //     //       await request(app)
    //     //         .put("/todos/3")
    //     //         .send(todoBody)
    //     //         .expect(HttpStatusCodes.UNAUTHORIZED);
    //     //     });
    //     //   });

    //     //   describe("deleteTodo", () => {
    //     //     it("should delete the todo", async () => {
    //     //       const id = "3";
    //     //       const response = await request(app)
    //     //         .delete(`/todos/${id}`)
    //     //         .set("Authorization", `Bearer ${test.accessToken}`)
    //     //         .expect(HttpStatusCodes.OK);

    //     //       expect(response.body.message).toBe(`Todo with id: ${id} deleted`);

    //     //       // checking if todo is deleted
    //     //       const todo = todos.find(({ id: todoId }) => todoId === id);
    //     //       expect(todo).toBeUndefined;
    //     //     });

    //     //     it("should return 400 Bad Request if id is not found", async () => {
    //     //       const id = "10";

    //     //       const response = await request(app)
    //     //         .delete(`/todos/${id}`)
    //     //         .set("Authorization", `Bearer ${test.accessToken}`)
    //     //         .expect(HttpStatusCodes.BAD_REQUEST);

    //     //       expect(response.body.message).toBe(`Todo with id: ${id} doesnt exist`);
    //     //     });

    //     //     it("should return 401 unauthorized if not authenticated", async () => {
    //     //       await request(app).get("/todos/1").expect(HttpStatusCodes.UNAUTHORIZED);
    //     //     });
    //     //   });
    //   });
  });

  describe("updateTodo", () => {
    it("should update the todo", async () => {
      const id = "1";
      const userBody = {
        title: "do homework",
        completed: "false",
      };
      const dataToBeUpdated = todos.find(({ id: todoId }) => todoId === id);

      const response = await request(app)
        .put(`/todos/${id}`)
        .set("Authorization", `Bearer ${test.accessToken}`)
        .send(userBody)
        .expect(HttpStatusCodes.OK);

      expect(response.body.message).toBe("todo updated successfully");
      expect(response.status).toBe(HttpStatusCodes.OK);
    });

    it("should return 400 Bad Request if id is not found", async () => {
      const id = "10";
      const userBody = {
        title: "make a coffee",
        completed: true,
      };
      const response = await request(app)
        .put(`/todos/${id}`)
        .set("Authorization", `Bearer ${test.accessToken}`)
        .send(userBody)
        .expect(HttpStatusCodes.BAD_REQUEST);

      expect(response.body.message).toBe(`updation failed`);
    });

    it("should return 401 unauthorized if not authenticated", async () => {
      const todoBody = {
        title: "make a coffee",
        completed: true,
      };
      await request(app)
        .put("/todos/2")
        .send(todoBody)
        .expect(HttpStatusCodes.UNAUTHORIZED);
    });
  });

  describe("deleteTodo", () => {
    it("should delete the todo", async () => {
      const id = "1";
      const response = await request(app)
        .delete(`/todos/${id}`)
        .set("Authorization", `Bearer ${test.accessToken}`)
        .expect(HttpStatusCodes.OK);

      expect(response.body.message).toBe(`todo deletion successful`);

      // checking if todo is deleted
      const todo = todos.find(({ id: todoId }) => todoId === id);
      expect(todo).toBeUndefined;
    });

    it("should return 400 Bad Request if id is not found", async () => {
      const id = "10";

      const response = await request(app)
        .delete(`/todos/${id}`)
        .set("Authorization", `Bearer ${test.accessToken}`)
        .expect(HttpStatusCodes.BAD_REQUEST);

      expect(response.body.message).toBe(`Todo with id: ${id} doesnt exist`);
    });

    it("should return 401 unauthorized if not authenticated", async () => {
      await request(app).get("/todos/1").expect(HttpStatusCodes.UNAUTHORIZED);
    });
  });
});
