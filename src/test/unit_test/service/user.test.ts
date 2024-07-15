import sinon from "sinon";
import * as UserModel from "../../../models/user.model";
import expect from "expect";
import {
  createUser,
  getUserId,
  getAllUsers,
  getUserByEmail,
  deleteUser,
  updateUser,
} from "../../../services/user.service";
import bcrypt from "bcrypt";
import { BadRequestError } from "../../../error/BadRequestError";
import { UserRole } from "../../../interfaces/user.interface";

describe("User service test", () => {
  describe("getUserById", () => {
    let userModelGetUserByIdStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUserByIdStub = sinon.stub(UserModel, "getUserById");
    });
    afterEach(() => {
      userModelGetUserByIdStub.restore();
    });

    it("should throw an errror when user is not found", () => {
      userModelGetUserByIdStub.returns(undefined);

      expect(() => getUserId("100")).toThrow(
        new BadRequestError("user with id:100 not found")
      );
    });

    it("should return user if user is found", () => {
      const user = {
        id: "1",
        name: "sangam chhetri",
        email: "sangamchhetri99999@gmail.com",
        role: "user",
        password: "test123",
        permissions: ["create", "read", "update", "delete"],
      };

      userModelGetUserByIdStub.withArgs("1").returns(user);

      const response = getUserId("1");
      expect(response).toStrictEqual(user);
    });
  });

  describe("createUser", () => {
    let bcryptHashStub: sinon.SinonStub;
    let userModelSignUpUserStub: sinon.SinonStub;

    beforeEach(() => {
      bcryptHashStub = sinon.stub(bcrypt, "hash");
      userModelSignUpUserStub = sinon.stub(UserModel, "signUpUser");
    });

    afterEach(() => {
      bcryptHashStub.restore();
      userModelSignUpUserStub.restore();
    });

    it("should create a new user", async () => {
      const body = {
        name: "sangam chhetri",
        password: "test123",
        email: "sangamchhetri99999@gmail.com",
        role: UserRole.User,
        permissions: ["create", "read", "update", "delete"],
      };

      const hashedPassword = "hashedPassword";

      const newUser = {
        id: "1",
        ...body,
        password: hashedPassword,
      };

      // Mock bcrypt.hash to resolve with hashedPassword
      bcryptHashStub.resolves(hashedPassword);

      // Mock UserModel.signUpUser to resolve with newUser
      userModelSignUpUserStub.resolves(newUser);

      // Call createUser function from the user service
      const result = await createUser(body);

      // Assertions
      expect(bcryptHashStub.callCount).toBe(1); // Ensure bcrypt.hash was called once
      expect(userModelSignUpUserStub.callCount).toBe(1); // Ensure UserModel.signUpUser was called once
      expect(userModelSignUpUserStub.getCall(0).args).toStrictEqual([
        body.name,
        body.email,
        hashedPassword,
        body.role,
        body.permissions,
      ]); // Check the arguments passed to UserModel.signUpUser

      expect(result).toEqual(newUser); // Ensure createUser returns the expected newUser object
    });
  });

  describe("getUsers", () => {
    let userModelGetUsersStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUsersStub = sinon.stub(UserModel, "getAllUsers");
    });

    afterEach(() => {
      userModelGetUsersStub.restore();
    });

    it("should return users if found", () => {
      const users = [
        {
          name: "User 1",
          email: "user1@test.com",
          password: "test123",
          id: "1",
          permissions: ["users.get"],
        },
        {
          name: "User 2",
          email: "user2@test.com",
          password: "test456",
          id: "1",
          permissions: ["users.get"],
        },
      ];

      userModelGetUsersStub.returns(users);

      const result = getAllUsers();

      expect(userModelGetUsersStub.callCount).toBe(1); // Ensure UserModel.getUsers was called once

      expect(userModelGetUsersStub.getCall(0).args).toStrictEqual([]);

      expect(result).toEqual(users);
    });

    it("should throw an error if users are not found", () => {
      userModelGetUsersStub.returns(undefined);

      expect(() => getAllUsers()).toThrow(
        new BadRequestError("No Users were found")
      );
    });
  });

  describe("getUsersByEmail", () => {
    let userModelGetUserByEmailStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUserByEmailStub = sinon.stub(UserModel, "getUsersByEmail");
    });
    afterEach(() => {
      userModelGetUserByEmailStub.restore();
    });
    it("should return user of queried email", () => {
      const user = {
        id: "1",
        name: "sangam chhetri",
        email: "sangamchhetri99999@gmail.com",
        role: UserRole.User,
        password: "test123",
        permissions: ["create", "read", "update", "delete"],
      };

      userModelGetUserByEmailStub.returns(user);
      const result = getUserByEmail(user.email);

      expect(userModelGetUserByEmailStub.callCount).toBe(1);
      expect(userModelGetUserByEmailStub.getCall(0).args).toStrictEqual([
        user.email,
      ]);

      expect(result).toEqual(user);
    });
  });

  describe("deleteUser", () => {
    let userModelDeleteUserStub: sinon.SinonStub;

    beforeEach(() => {
      userModelDeleteUserStub = sinon.stub(UserModel, "deleteUser");
    });

    afterEach(() => {
      userModelDeleteUserStub.restore();
    });

    it("should call delete user with of given id", () => {
      const userId = "1";
      userModelDeleteUserStub.returns(true);

      const result = deleteUser(userId);

      expect(userModelDeleteUserStub.callCount).toBe(1);
      expect(userModelDeleteUserStub.calledWith(userId)).toBe(true);
      expect(result).toBe(true);
    });

    it("should return false if UserModel.deleteUser returns false", () => {
      const userId = "4";

      userModelDeleteUserStub.returns(false);

      const result = deleteUser(userId);

      expect(userModelDeleteUserStub.callCount).toBe(1);
      expect(userModelDeleteUserStub.calledWith(userId)).toBe(true);
      expect(result).toBe(false);
    });
  });

  describe("updateUser", () => {
    let userModelUpdateUserStub: sinon.SinonStub;

    beforeEach(() => {
      userModelUpdateUserStub = sinon.stub(UserModel, "updateUser");
    });

    afterEach(() => {
      userModelUpdateUserStub.restore();
    });

    it("should call update the user of given id", async () => {
      const userId = "1";
      const updateData = { email: "newemail@example.com" };
      const updatedUser = {
        id: "1",
        email: "newemail@example.com",
        name: "User One",
        password: "hashedpassword",
      };

      userModelUpdateUserStub.resolves(updatedUser);

      const result = await updateUser(userId, updateData);

      expect(userModelUpdateUserStub.calledOnce).toBe(true);
      expect(userModelUpdateUserStub.calledWith(userId, updateData)).toBe(true);
      expect(result).toEqual(updatedUser);
    });

    it("should return undefined if UserModel.updateUser returns undefined", async () => {
      const userId = "3";
      const updateData = { email: "nonexistent@example.com" };

      userModelUpdateUserStub.resolves(undefined);

      const result = await updateUser(userId, updateData);

      expect(userModelUpdateUserStub.callCount).toBe(1);
      expect(userModelUpdateUserStub.calledWith(userId, updateData)).toBe(true);
      expect(result).toBeUndefined();
    });
  });
});
