import {
  GetUserQuery,
  PermissionBody,
  RoleInterface,
  UserInterface,
  UserRole,
} from "../interfaces/user.interface";
import bcrypt from "bcrypt";
import { BaseModel } from "./base";

export class UserModel extends BaseModel {
  static async create(
    user: Pick<UserInterface, "name" | "password" | "email">
  ) {
    const userToCreate = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    const insertedData = await this.queryBuilder()
      .insert(userToCreate)
      .table("users");
  }

  static async updateUser(
    id: string,
    user: Partial<Pick<UserInterface, "email" | "password" | "name">>
  ) {
    const userToUpdate = {
      name: user.name,
      email: user.email,
      password: user.password,
      updatedAt: new Date(),
    };

    const query = this.queryBuilder()
      .update(userToUpdate)
      .table("users")
      .where({ id });

    return query.toString();
  }

  static async getUsers(filter: GetUserQuery) {
    const { q } = filter;

    let query = this.queryBuilder()
      .select("id", "name", "email")
      .table("users")
      .limit(filter.size)
      .offset((filter.page - 1) * filter.size);

    if (q) {
      query.whereLike("name", `%${q}%`);
    }
    return await query;
  }

  static count(filter: GetUserQuery) {
    const { q } = filter;

    const query = this.queryBuilder().count("*").table("users").first();

    if (q) {
      query.whereLike("name", `%${q}%`);
    }
    return query;
  }

  static async deleteUser(id: string) {
    const deletedData = this.queryBuilder().table("users").where({ id }).del();
    console.log(`delete data is`, deletedData);
    return await deletedData;
  }

  static async getUserByEmail(email: string) {
    const user = this.queryBuilder()
      .table("users")
      .select(
        "users.id",
        "users.name",
        "users.email",
        "users.password",
        "user_permissions.permission_type",
        "user_role.user_role"
      )
      .leftJoin("user_permissions", "users.id", "user_permissions.user_id")
      .leftJoin("user_role", "users.id", "user_role.user_id")
      .where({ "users.email": email });
    return await user;
  }

  static getUserById(id: string) {
    const user = this.queryBuilder()
      .select("id", "name", "users.email")
      .table("users")
      .where({ id });

    return user;
  }

  static async createPermissions() {
    const permissionToCreate = {
      permissionType: "get",
      userId: 2,
    };
  }

  static async createUserRoles(body: RoleInterface) {
    const roleToCreate = {
      userRole: body.userRole,
      userId: body.userId,
    };

    const insertedRole = this.queryBuilder()
      .insert(roleToCreate)
      .table("user_role");

    return await insertedRole;
  }

  static async createUserPermissions(body: PermissionBody, creatorId: string) {
    const permissionToCreate = {
      permissionType: body.permissionType,
      userId: body.userId,
      createdBy: creatorId,
    };
    const createdPermissions = this.queryBuilder()
      .insert(permissionToCreate)
      .table("user_permissions");

    await createdPermissions;
  }
}

export let users: UserInterface[] = [];

const signUpUser = async (
  newName: string,
  newEmail: string,
  password: string,
  role: UserRole,
  permissions: string[]
) => {
  console.log(`came from create user test`);

  const newUser: UserInterface = {
    id: `${users.length + 1}`,
    name: newName,
    email: newEmail,
    role: role,
    password,
    permissions: permissions,
  };

  users.push(newUser);
  return newUser;
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
