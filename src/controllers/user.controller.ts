import { Request, Response } from "express";
import * as UserServices from "../services/user.service";

const getUsers = async (req: Request, res: Response) => {
  const users = UserServices.getUsers();
  return res.status(200).json(await users);
};

export { getUsers };
