import HTTPStatusCodes from "http-status-codes";
import { Request } from "../interfaces/auth.interface";
import { NextFunction, Response } from "express";
import { UnauthenticatedError } from "../error/UnauthorizedError";
import { ForbiddenError } from "../error/ForbiddenError";
import { NotFoundError } from "../error/NotFoundError";
import { BadRequestError } from "../error/BadRequestError";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("ErrorHandler");

const genericErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.stack) {
    logger.error(error.stack);
  }
  if (error instanceof UnauthenticatedError) {
    return res.status(HTTPStatusCodes.UNAUTHORIZED).json({
      message: error.message,
    });
  }
  if (error instanceof ForbiddenError) {
    return res.status(HTTPStatusCodes.FORBIDDEN).json({
      message: error.message,
    });
  }

  if (error instanceof NotFoundError) {
    return res.status(HTTPStatusCodes.NOT_FOUND).json({
      message: error.message,
    });
  }

  if (error instanceof BadRequestError) {
    return res.status(HTTPStatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

export { genericErrorHandler };
