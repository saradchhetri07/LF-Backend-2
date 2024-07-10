import { Request, Response } from "express";
import * as AuthServices from "../services/auth.service";

const login = async (req: Request, res: Response) => {
  const { body } = req;
  const data = await AuthServices.login(body);

  res.cookie("accessToken", data.accessToken, { httpOnly: true });
  res.cookie("refreshToken", data.refreshToken, { httpOnly: true });

  return res.status(200).json(data);
};

const signUp = async (req: Request, res: Response) => {
  const { body } = req;

  //check if user already exists
  const existingUser = AuthServices.getUserByEmail(body.email);

  if (existingUser) {
    return res.status(409).json({ message: "user already exists" });
  }

  const users = AuthServices.signUpUser(body);

  return res.status(200).json({ message: "Sign up successful" });
};

export { login, signUp };
