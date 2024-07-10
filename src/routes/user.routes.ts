import express from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/user.controller";
import { authenticate, isSuperUser } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(authenticate);
router.use(isSuperUser());

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;
