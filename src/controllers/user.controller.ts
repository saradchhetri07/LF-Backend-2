import { BaseError } from "./../error/BaseError";
import HTTPStatusCodes from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import * as UserServices from "../services/user.service";
import { NotFoundError } from "../error/NotFoundError";
import { BadRequestError } from "../error/BadRequestError";
import { strictTransportSecurity } from "helmet";

const getAllUsers = async (req: Request, res: Response) => {
  const users = UserServices.getAllUsers();

  return res.status(200).json(await users);
};

const getUserById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const data = UserServices.getUserId(id);

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

    const emailExists = UserServices.getUserByEmail(body.email);

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

    if (updatedUser == undefined) {
      throw new Error(`User with id: ${id} not found`);
    }

    return res.status(HTTPStatusCodes.OK).json(updatedUser);
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const isDeleted = UserServices.deleteUser(id);
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

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
