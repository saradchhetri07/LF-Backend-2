import { Request as ExpressRequest } from "express";
import { UserInterface } from "./user.interface";

export interface Request extends ExpressRequest {
  user?: UserInterface;
}
