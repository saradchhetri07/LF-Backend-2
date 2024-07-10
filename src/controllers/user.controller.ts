import { BaseError } from "./../error/BaseError";
import HTTPStatusCodes from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import * as UserServices from "../services/user.service";
import { NotFoundError } from "../error/NotFoundError";
import { BadRequestError } from "../error/BadRequestError";

const getAllUsers = async (req: Request, res: Response) => {
  const users = UserServices.getAllUsers();
  return res.status(200).json(await users);
};

const getUserById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const data = UserServices.getUserId(id);

    if (data == undefined) {
      throw new Error("user not found");
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

    await UserServices.createUser(body);

    return res
      .status(HTTPStatusCodes.OK)
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
      throw new Error("user updation failed");
    }

    return res.status(HTTPStatusCodes.OK).json(updatedUser);
  } catch (error) {
    if (error instanceof Error) {
      next(new NotFoundError(error.message));
    }
  }
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const isDeleted = UserServices.deleteUser(id);
    if (!isDeleted) {
      throw new Error("user deletion failed");
    }
    return res
      .status(HTTPStatusCodes.OK)
      .json({ message: "user deletion successful" });
  } catch (error) {
    if (error instanceof Error) {
      next(new NotFoundError(error.message));
    }
  }
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
