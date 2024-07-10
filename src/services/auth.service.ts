import bcrypt from "bcrypt";
import { UserInterface } from "../interfaces/user.interface";
import config from "../config";
import * as UserServices from "../services/user.service";
import { JwtPayload, verify, sign } from "jsonwebtoken";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("AuthService");

/**
 * Retrieves a user by their email address.
 * @param {string} email - The email address of the user.
 * @returns {UserInterface | undefined} The user object if found, undefined otherwise.
 */
const getUserByEmail = (email: string) => {
  return UserServices.getUserByEmail(email);
};

/**
 * Signs up a new user with provided details.
 * @param {Pick<UserInterface, "name" | "email" | "password" | "role" | "permissions">} body - The user details to sign up.
 * @returns {UserInterface} The newly created user object.
 */
const signUpUser = (
  body: Pick<
    UserInterface,
    "name" | "email" | "password" | "role" | "permissions"
  >
) => {
  logger.info(`Signing up user with email: ${body.email}`);
  return UserServices.signUpUser(body);
};

/**
 * Logs in a user with provided email and password.
 * @param {Pick<UserInterface, "email" | "password">} body - The credentials of the user to log in.
 * @returns {Object} Object containing access and refresh tokens upon successful login.
 * @throws {Error} If the email or password is invalid.
 */
const login = async (body: Pick<UserInterface, "email" | "password">) => {
  const existingUser = UserServices.getUserByEmail(body.email);
  logger.info(`Logging in user with email: ${body.email}`);

  if (!existingUser) {
    throw new Error("Invalid email or password");
  }

  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser!.password
  );

  if (!isValidPassword) {
    throw new Error("Invalid password or email");
  }

  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    role: existingUser.role,
    permisssions: existingUser.permissions,
  };

  const accessToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  const refreshToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });

  return {
    accessToken,
    refreshToken,
  };
};

/**
 * Refreshes the access and refresh tokens using the provided refresh token.
 * @param {string} refreshToken - The refresh token used to generate new access and refresh tokens.
 * @returns {Object} Object containing new access and refresh tokens.
 */
const refresh = (refreshToken: string) => {
  const decodedRefreshToken = verify(
    refreshToken,
    config.jwt.secret!
  ) as JwtPayload;

  const payload = {
    id: decodedRefreshToken.id,
    name: decodedRefreshToken.name,
    email: decodedRefreshToken.email,
  };

  const newAccessToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  const newRefreshToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });

  return {
    newAccessToken,
    newRefreshToken,
  };
};

export { getUserByEmail, signUpUser, login, refresh };
