import { NextFunction } from "express";
import { Request, Response } from "express";
import { CustomRequest } from "../interfaces/user.interface";
import { JwtPayload, verify, TokenExpiredError, sign } from "jsonwebtoken";
import config from "../config";

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new Error("unauthenticated"));
    return;
  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new Error("Unauthorized"));
    return;
  }
  try {
    const decodedToken = verify(token[1], config.jwt.secret!) as JwtPayload;
    req.user = decodedToken;
    next();
  } catch (error) {
    return next(new Error("Failed to verify refresh token"));
  }
};

export { auth };
