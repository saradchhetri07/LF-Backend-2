import { UserInterface } from "../interfaces/user.interface";
// import { users } from "../constants/user.constants";

import bcrypt from "bcrypt";

const users: UserInterface[] = [];

const signUpUser = async (
  newName: string,
  newEmail: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: UserInterface = {
    id: `${users.length + 1}`,
    name: newName,
    email: newEmail,
    password: hashedPassword,
  };

  users.push(newUser);

  return users;
};

const getUsers = async () => {
  return users;
};

const getUsersByEmail = (email: string) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return users[i];
    }
  }
  //   return users.find(({ email: userEmail }) => userEmail === email);
  //   const user = users.map((user) => {
  //     return user.email == email;
  //   });
  //   console.log(`user with email ${email}`, user);

  //   return user;
};

export { signUpUser, getUsersByEmail, getUsers };
