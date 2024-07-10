import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface GetUserQuery {
  q?: string;
}

export interface CustomRequest extends Request {
  user?: JwtPayload;
}
