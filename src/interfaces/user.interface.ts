import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export enum UserRole {
  User = "user",
  superUser = "superUser",
}

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  permissions: string[];
  role: UserRole;
}

export interface GetUserQuery {
  q?: string;
  page?: number;
  size?: number;
}

export interface RoleInterface {
  userRole: UserRole;
  userId: number;
}

export interface PermissionBody {
  permissionType: string;
  userId: number;
}
