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
    if (error instanceof TokenExpiredError) {
      // Access token expired, attempt to refresh using refresh token
      const refreshToken = req.cookies.refreshToken; // Extract refresh token from Authorization header

      if (!refreshToken) {
        return next(new Error("Refresh token missing"));
      }

      try {
        const decodedRefreshToken = verify(
          refreshToken,
          config.jwt.secret!
        ) as JwtPayload;

        const payload = {
          id: decodedRefreshToken.id,
          name: decodedRefreshToken.name,
          email: decodedRefreshToken.email,
        };

        const newAccessToken = sign(payload, config.jwt.secret!, {
          expiresIn: config.jwt.accessTokenExpiryMS,
        });

        const newRefreshToken = sign(payload, config.jwt.secret!, {
          expiresIn: config.jwt.refreshTokenExpiryMS,
        });

        // Set new access token in response headers or cookies
        res.cookie("accessToken", newAccessToken, { httpOnly: true });
        res.cookie("refreshToken", newRefreshToken, { httpOnly: true });

        // Set req.user with refreshed data (optional)
        req.user = decodedRefreshToken;

        // Continue with the next middleware or request handler
        next();
      } catch (refreshError) {
        return next(new Error("Failed to verify refresh token"));
      }
    } else {
      return next(new Error("Unauthorized"));
    }
  }
};

export { auth };
