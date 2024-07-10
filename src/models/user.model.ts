import { UserInterface, UserRole } from "../interfaces/user.interface";
import bcrypt from "bcrypt";

let users: UserInterface[] = [
  {
    id: "1",
    name: "sangam chhetri",
    email: "sangamchhetri99999@gmail.com",
    role: UserRole.User,
    password: "$2b$10$o9QUYn0uB91ar3VFH5l0o.RT1ycA4JPyde65RewXOc3EBtN9Tc0sG",
    permissions: ["create", "read", "update", "delete"],
  },
  {
    id: "2",
    name: "sarad chhetri",
    email: "saradchhetri20690@gmail.com",
    role: UserRole.superUser,
    password: "$2b$10$ErzS825t5MwlRXnFSZR9pOJBbATB8jhdRAybiMQZ5pqaa./gT.x3K",
    permissions: ["create", "read", "update", "delete"],
  },
];

const signUpUser = async (
  newName: string,
  newEmail: string,
  password: string,
  role: UserRole,
  permissions: string[]
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: UserInterface = {
    id: `${users.length + 1}`,
    name: newName,
    email: newEmail,
    role: role,
    password: hashedPassword,
    permissions: permissions,
  };

  users.push(newUser);
};

const getAllUsers = async () => {
  return users;
};

const getUsersByEmail = (email: string) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return users[i];
    }
  }
};

const getUserById = (id: string) => {
  return users.find(({ id: userId }) => userId === id);
};

const deleteUser = (id: string) => {
  const initialUserLength = users.length;
  users = users.filter((user) => user.id !== id);

  return users.length != initialUserLength;
};

const updateUser = async (
  id: string,
  body: Partial<Pick<UserInterface, "email" | "password" | "name">>
) => {
  let userIndex = -1;
  userIndex = users.findIndex((user) => user.id === id);
  // If user not found, return undefined
  if (userIndex === -1) {
    return undefined;
  }
  //get the user object
  const user = users[userIndex];

  if (body.email !== undefined) {
    user.email = body.email;
  }
  if (body.password !== undefined) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    user.password = hashedPassword;
  }
  if (body.name !== undefined) {
    user.name = body.name;
  }

  users[userIndex] = user;

  return user;
};

export {
  signUpUser,
  getUsersByEmail,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
};
