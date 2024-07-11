import express from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/user.controller";
import { authenticate, isSuperUser } from "../middlewares/auth.middleware";
import { validateReqBody } from "../middlewares/validator";
import {
  createUserBodySchema,
  getUserQuerySchema,
  updateUserBodySchema,
} from "../schema/user.schema";

const router = express.Router();

router.use(authenticate);
router.use(isSuperUser());

router.get("/", getAllUsers);
router.post("/", validateReqBody(createUserBodySchema), createUser);
router.get("/:id", validateReqBody(getUserQuerySchema), getUserById);
router.delete("/:id", validateReqBody(getUserQuerySchema), deleteUser);
router.put("/:id", validateReqBody(updateUserBodySchema), updateUser);

export default router;
