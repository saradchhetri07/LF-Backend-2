// import express from "express";
// import request from "supertest";
// import expect from "expect";
// import HttpStatusCodes from "http-status-codes";
// import * as UserServices from "../../../services/user.service";
// import sinon from "sinon";
// import router from "../../../routes/index.routes";
// import config from "../../../config";
// import bcrypt from "bcrypt";
// import { users } from "../../../models/user.model";

// const { test } = config;

// describe("user service integration test", () => {
//   const app = express();

//   app.use(router);

//   describe("createUser API test", () => {
//     it.only("should create new user", async () => {
//       const userBody = {
//         name: "shyam chhetri",
//         email: "shyamchhetri@gmail.com",
//         password: "Pepsodent@123",
//         role: "user",
//         permissions: ["get", "read", "update"],
//       };

//       const response = await request(app)
//         .post("/users")
//         .set("Authorization", `Bearer ${test.accessTokenSuperAdmin}`)
//         .send(userBody)
//         .expect(HttpStatusCodes.CREATED);

//       expect(response.body.message).toBe("User created successfully");

//       // // checking if user is added to usersArr
//       const addedUser = users.find((user) => user.email === userBody.email);

//       const isPasswordCorrect = await bcrypt.compare(
//         userBody.password,
//         addedUser.password
//       );

//       expect(isPasswordCorrect).toBe(true);

//       expect(addedUser.email).toBe(userBody.email);

//       expect(addedUser).toBeDefined();
//       expect(addedUser.name).toBe(userBody.name);
//       expect(addedUser.email).toBe(userBody.email);
//     });
//   });

//   describe("getAllUsers", () => {
//     it.only("should return all user when no query is provided", async () => {
//       const response = await request(app)
//         .get("/users")
//         .set("Authorization", `Bearer ${test.accessTokenSuperAdmin}`)
//         .expect(HttpStatusCodes.OK);

//       expect(response.body).toStrictEqual(users);
//     });
//   });

//   describe("getUserById", () => {
//     it.only("should return provided id's user", async () => {
//       const id = "2";
//       const response = await request(app)
//         .get(`/users/${id}`)
//         .set("Authorization", `Bearer ${test.accessTokenSuperAdmin}`)
//         .expect(HttpStatusCodes.OK);

//       console.log(`response gotten is`, response);
//       const expectedOutput = users.find(({ id: userId }) => userId === id);

//       expect(response.body).toBeDefined();
//       expect(response.body).toStrictEqual(expectedOutput);
//     });

//     it.only("should be bad request error if id is incorrect ", async () => {
//       const id = "4";
//       const response = await request(app)
//         .get(`/users/${id}`)
//         .set("Authorization", `Bearer ${test.accessTokenSuperAdmin}`)
//         .expect(HttpStatusCodes.NOT_FOUND);

//       expect(response.body.message).toBe(`user with id:${id} not found`);
//     });
//   });

//   describe("updateUser", () => {
//     it.only("should update the user's data (no password change)", async () => {
//       const id = "1";
//       const userBody = {
//         name: "test",
//         email: "test@test.com",
//       };
//       const response = await request(app)
//         .put(`/users/${id}`)
//         .set("Authorization", `Bearer ${test.accessTokenSuperAdmin}`)
//         .send(userBody)
//         .expect(HttpStatusCodes.OK);

//       const dataToBeUpdated = users.find(({ id: userId }) => userId === id);
//       const expectedOutput = { ...dataToBeUpdated, ...userBody };

//       expect(response.body).toStrictEqual(expectedOutput);
//     });

//     it.only("should update the user's password data", async () => {
//       const id = "1";
//       const userBody = {
//         name: "test",
//         email: "test@test.com",
//         password: "Asdf1234@",
//       };
//       const response = await request(app)
//         .put(`/users/${id}`)
//         .set("Authorization", `Bearer ${test.accessTokenSuperAdmin}`)
//         .send(userBody)
//         .expect(HttpStatusCodes.OK);

//       const dataToBeUpdated = users.find(({ id: userId }) => userId === id);

//       const isPasswordCorrect = await bcrypt.compare(
//         userBody.password,
//         response.body.password
//       );

//       expect(isPasswordCorrect).toBe(true);
//     });

//     it.only("should be bad request error if id is incorrect ", async () => {
//       const id = "99999";
//       const userBody = {
//         name: "test",
//         email: "test@test.com",
//         password: "Asdf1234@",
//       };
//       const response = await request(app)
//         .put(`/users/${id}`)
//         .set("Authorization", `Bearer ${test.accessTokenSuperAdmin}`)
//         .send(userBody)
//         .expect(HttpStatusCodes.BAD_REQUEST);

//       expect(response.body.message).toBe(`User with id: ${id} not found`);
//     });
//   });

//   describe("deleteUser", () => {
//     it.only("should delete the user", async () => {
//       const id = "1";
//       const response = await request(app)
//         .delete(`/users/${id}`)
//         .set("Authorization", `Bearer ${test.accessTokenSuperAdmin}`)
//         .expect(HttpStatusCodes.OK);

//       expect(response.body.message).toBe(`User with id: ${id} deleted`);

//       // checking if user is added to usersArr
//       const user = users.find((user) => user.id === id);
//       expect(user).toBeUndefined;
//     });

//     it.only("should return bad request error if id is incorrect", async () => {
//       const id = "99999";

//       const response = await request(app)
//         .put(`/users/${id}`)
//         .set("Authorization", `Bearer ${test.accessTokenSuperAdmin}`)
//         .expect(HttpStatusCodes.BAD_REQUEST);

//       expect(response.body.message).toBe(`User with id: ${id} not found`);
//     });
//   });
// });
