import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth.interface";
import { verify } from "jsonwebtoken";
import config from "../config";
import { UserInterface, UserRole } from "../interfaces/user.interface";
import { UnauthenticatedError } from "../error/UnauthorizedError";
import { ForbiddenError } from "../error/ForbiddenError";

/**
 * Middleware to authenticate user based on JWT token in Authorization header.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next function to call in the middleware chain.
 * @throws {UnauthenticatedError} Throws error if token is not found, invalid, or authentication fails.
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnauthenticatedError("token not found"));
    return;
  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new UnauthenticatedError("Invalid token"));

    return;
  }
  try {
    const user = verify(token[1], config.jwt.secret!) as UserInterface;

    req.user = user;
    next();
  } catch (error) {
    next(new UnauthenticatedError("Unauthenticated"));
  }
}

/**
 * Middleware to authorize user based on permission.
 * @param {string} permission - The permission string to check against user's permissions.
 * @returns {Function} Express middleware function.
 */
export function authorize(permission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;

    // Check if user is a super user
    if (user.role === UserRole.superUser) {
      return next();
    }
    if (!user.permissions.includes(permission)) {
      next(new Error("Forbidden"));
    }
    next();
  };
}

/**
 * Middleware to check if user is a super user.
 * @returns {Function} Express middleware function.
 */
export function isSuperUser() {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;

    //check if user is super user
    if (user.role === UserRole.superUser) {
      return next();
    } else {
      next(new ForbiddenError("forbidden"));
    }
  };
}
