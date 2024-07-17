import { BadRequestError } from "./../error/BadRequestError";
import {
  GetUserQuery,
  PermissionBody,
  RoleInterface,
  UserInterface,
} from "./../interfaces/user.interface";
import * as UserModel from "../models/user.model";
import bcrypt from "bcrypt";

/**
 * Signs up a new user with provided details.
 * @param {Pick<UserInterface, "name" | "email" | "password" | "permissions" | "role">} body - The user details to sign up.
 * @returns {Promise<UserInterface>} The newly created user object.
 */
const signUpUser = (
  body: Pick<
    UserInterface,
    "name" | "email" | "password" | "permissions" | "role"
  >
) => {
  return UserModel.signUpUser(
    body.name,
    body.email,
    body.password,
    body.role,
    body.permissions
  );
};

/**
 * Retrieves a user by their email address.
 * @param {string} email - The email address of the user.
 * @returns {Promise<UserInterface | undefined>} The user object if found, undefined otherwise.
 */
const getUserByEmail = async (email: string) => {
  const user = await UserModel.UserModel.getUserByEmail(email);

  if (user.length === 0) {
    return undefined;
  }

  const permissions: string[] = [];

  for (let i = 0; i < user.length; i++) {
    permissions.push(user[i].permissionType);
  }
  const finalUser: UserInterface = {
    ...user[0],
    role: user[0].userRole,
    permissions: permissions,
  };

  return finalUser;
};

/**
 * Retrieves all users.
 * @returns {Promise<UserInterface[]>} Array of all user objects.
 */
const getAllUsers = async (query: GetUserQuery) => {
  console.log(`came inside service get all users`);

  const data = await UserModel.UserModel.getUsers(query);
  if (!data) {
    throw new BadRequestError("No Users were found");
  }
  const count = await UserModel.UserModel.count(query);

  const meta = {
    page: query.page,
    size: data.length,
    total: +count.count,
  };

  return { data, meta };
};

/**
 * Creates a new user with provided details.
 * @param {Pick<UserInterface, "name" | "password" | "email" | "role" | "permissions">} body - The user details to create.
 * @returns {Promise<UserInterface>} The newly created user object.
 */
const createUser = async (
  body: Pick<UserInterface, "name" | "password" | "email">
) => {
  const hashedPassword = await bcrypt.hash(body.password, 10);
  body.password = hashedPassword;
  await UserModel.UserModel.create(body);
};

/**
 * Retrieves a user by their ID.
 * @param {string} id - The ID of the user to retrieve.
 * @returns {Promise<UserInterface | undefined>} The user object if found, undefined otherwise.
 */
const getUserId = async (id: string) => {
  const data = UserModel.UserModel.getUserById(id);

  if (!data) {
    throw new BadRequestError(`user with id:${id} not found`);
  }

  return data;
};

/**
 * Deletes a user by their ID.
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise<boolean>} True if deletion was successful, false otherwise.
 */
const deleteUser = async (id: string) => {
  return UserModel.UserModel.deleteUser(id);
};

const createRole = async (body: RoleInterface) => {
  return UserModel.UserModel.createUserRoles(body);
};

const createPermissions = async (body: PermissionBody, id: string) => {
  return UserModel.UserModel.createUserPermissions(body, id);
};
/**
 * Updates a user by their ID with provided details.
 * @param {string} id - The ID of the user to update.
 * @param {Partial<Pick<UserInterface, "email" | "password" | "name">>} body - The updated user details.
 * @returns {Promise<boolean>} True if update was successful, false otherwise.
 */
const updateUser = async (
  id: string,
  body: Partial<Pick<UserInterface, "email" | "password" | "name">>
) => {
  const hashedPassword = await bcrypt.hash(body.password, 10);
  body.password = hashedPassword;
  return UserModel.UserModel.updateUser(id, body);
};

export {
  signUpUser,
  getUserByEmail,
  getAllUsers,
  getUserId,
  createUser,
  deleteUser,
  updateUser,
  createRole,
  createPermissions,
};
