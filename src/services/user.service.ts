import { UserInterface } from "../interfaces/user.interface";
import * as UserModel from "../models/user.model";

const signUpUser = (
  body: Pick<UserInterface, "name" | "email" | "password">
) => {
  return UserModel.signUpUser(body.name, body.email, body.password);
};

const getUserByEmail = (email: string) => {
  return UserModel.getUsersByEmail(email);
};

const getUsers = () => {
  return UserModel.getUsers();
};
export { signUpUser, getUserByEmail, getUsers };
