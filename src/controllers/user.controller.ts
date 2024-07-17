import { BaseError } from "./../error/BaseError";
import HTTPStatusCodes from "http-status-codes";
import { Request } from "../interfaces/auth.interface";
import { NextFunction, Response } from "express";
import * as UserServices from "../services/user.service";
import { NotFoundError } from "../error/NotFoundError";
import { BadRequestError } from "../error/BadRequestError";
import { GetUserQuery } from "../interfaces/user.interface";

const getAllUsers = async (req: Request, res: Response) => {
  const { query } = req;
  console.log(`query obtained is`, query);

  const data = await UserServices.getAllUsers(query);

  return res.status(200).json(data);
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const data = await UserServices.getUserId(id);

    if (data == undefined) {
      throw new Error(`user with id:${id} not found`);
    }

    return res.status(HTTPStatusCodes.OK).json(data);
  } catch (error) {
    if (error instanceof Error) {
      next(new NotFoundError(error.message));
    }
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;

    const emailExists = await UserServices.getUserByEmail(body.email);
    console.log(`email exist `, emailExists);

    if (emailExists) {
      throw new Error("user with that email already exists");
    }
    await UserServices.createUser(body);

    return res
      .status(HTTPStatusCodes.CREATED)
      .json({ message: "User created successfully" });
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedUser = await UserServices.updateUser(id, body);

    if (updatedUser === undefined) {
      throw new Error(`User with id: ${id} not found`);
    }

    return res
      .status(HTTPStatusCodes.OK)
      .json({ message: "user has been updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const isDeleted = await UserServices.deleteUser(id);
    if (!isDeleted) {
      throw new Error(`User with id: ${id} not found`);
    }
    return res
      .status(HTTPStatusCodes.OK)
      .json({ message: `User with id: ${id} deleted` });
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};

const createRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const roleCreated = UserServices.createRole(body);
    if (!roleCreated) {
      throw new Error("Role creation failed");
    }
    return res
      .status(HTTPStatusCodes.CREATED)
      .json({ message: "role has been created" });
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};

const createPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    const user = req.user!;

    const permissionCreated = UserServices.createPermissions(body, user.id);
    if (!permissionCreated) {
      throw new Error("Permission creation failed");
    }
    return res
      .status(HTTPStatusCodes.CREATED)
      .json({ message: "permission has been created" });
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createRole,
  createPermissions,
};
