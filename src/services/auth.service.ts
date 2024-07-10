import bcrypt from "bcrypt";
import { UserInterface } from "../interfaces/user.interface";
import config from "../config";
import * as UserServices from "../services/user.service";
import { JwtPayload, verify, sign } from "jsonwebtoken";

const getUserByEmail = (email: string) => {
  return UserServices.getUserByEmail(email);
};

const signUpUser = (
  body: Pick<UserInterface, "name" | "email" | "password">
) => {
  return UserServices.signUpUser(body);
};

const login = async (body: Pick<UserInterface, "email" | "password">) => {
  const existingUser = UserServices.getUserByEmail(body.email);

  if (!existingUser) {
    return {
      error: "Invalid email or password",
    };
  }

  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser!.password
  );

  if (!isValidPassword) {
    return {
      error: "Invalid email or password",
    };
  }
  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
  };

  const accessToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  const refreshToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });

  return {
    accessToken,
    refreshToken,
  };
};

const refresh = (refreshToken: string) => {
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

  return {
    newAccessToken,
    newRefreshToken,
  };
};

export { getUserByEmail, signUpUser, login, refresh };
