import express from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
  createRole,
  createPermissions,
} from "../controllers/user.controller";
import { authenticate, isSuperUser } from "../middlewares/auth.middleware";
import { validateReqBody, validateReqQuery } from "../middlewares/validator";
import {
  createUserBodySchema,
  getUserQuerySchema,
  updateUserBodySchema,
} from "../schema/user.schema";
import { getUsersByEmail } from "../models/user.model";

const router = express.Router();

router.use(authenticate);
router.use(isSuperUser());

router.get("/", validateReqQuery(getUserQuerySchema), getAllUsers);
router.post("/", validateReqBody(createUserBodySchema), createUser);
router.get("/:id", validateReqQuery(getUserQuerySchema), getUserById);
router.delete("/:id", validateReqQuery(getUserQuerySchema), deleteUser);
router.put("/:id", validateReqBody(updateUserBodySchema), updateUser);
router.post("/role", createRole);
router.post("/permissions", createPermissions);

export default router;
