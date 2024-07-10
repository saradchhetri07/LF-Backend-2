import HTTPStatusCodes from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import * as AuthServices from "../services/auth.service";
import { BadRequestError } from "../error/BadRequestError";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const data = await AuthServices.login(body);

    if (data === undefined) {
      throw new Error("login failed");
    }

    return res.status(HTTPStatusCodes.OK).json(data);
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;

    //check if user already exists
    const existingUser = AuthServices.getUserByEmail(body.email);

    if (existingUser) {
      throw new Error("User already exists with that email");
    }

    const users = AuthServices.signUpUser(body);

    if (users === undefined) {
      throw new Error("SignUp failed");
    }

    return res
      .status(HTTPStatusCodes.OK)
      .json({ message: "Sign Up successful" });
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    const data = AuthServices.refresh(refreshToken);
    if (data === undefined) {
      throw new Error("refresh token invalid");
    }
    return res.status(HTTPStatusCodes.OK).json(data);
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};

export { login, signUp, refresh };
