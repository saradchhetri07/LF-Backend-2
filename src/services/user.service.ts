import { BadRequestError } from "./../error/BadRequestError";
import { GetUserQuery, UserInterface } from "./../interfaces/user.interface";
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
const getUserByEmail = (email: string) => {
  const user = UserModel.getUsersByEmail(email);

  return user;
};

/**
 * Retrieves all users.
 * @returns {Promise<UserInterface[]>} Array of all user objects.
 */
const getAllUsers = () => {
  const users = UserModel.getAllUsers();
  if (!users) {
    throw new BadRequestError("No Users were found");
  }
  return users;
};

/**
 * Creates a new user with provided details.
 * @param {Pick<UserInterface, "name" | "password" | "email" | "role" | "permissions">} body - The user details to create.
 * @returns {Promise<UserInterface>} The newly created user object.
 */
const createUser = async (
  body: Pick<
    UserInterface,
    "name" | "password" | "email" | "role" | "permissions"
  >
) => {
  const hashedPassword = await bcrypt.hash(body.password, 10);

  return UserModel.signUpUser(
    body.name,
    body.email,
    hashedPassword,
    body.role,
    body.permissions
  );
};

/**
 * Retrieves a user by their ID.
 * @param {string} id - The ID of the user to retrieve.
 * @returns {Promise<UserInterface | undefined>} The user object if found, undefined otherwise.
 */
const getUserId = (id: string) => {
  const data = UserModel.getUserById(id);

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
const deleteUser = (id: string) => {
  return UserModel.deleteUser(id);
};

/**
 * Updates a user by their ID with provided details.
 * @param {string} id - The ID of the user to update.
 * @param {Partial<Pick<UserInterface, "email" | "password" | "name">>} body - The updated user details.
 * @returns {Promise<boolean>} True if update was successful, false otherwise.
 */
const updateUser = (
  id: string,
  body: Partial<Pick<UserInterface, "email" | "password" | "name">>
) => {
  return UserModel.updateUser(id, body);
};
export {
  signUpUser,
  getUserByEmail,
  getAllUsers,
  getUserId,
  createUser,
  deleteUser,
  updateUser,
};
