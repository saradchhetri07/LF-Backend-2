import express from "express";
import authRouter from "./auth.routes";
import todosRouter from "../routes/todos.routes";
import userRouter from "../routes/user.routes";
import { genericErrorHandler } from "../middlewares/errorHandler";

const router = express.Router();
router.use(express.json());

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/todos", todosRouter);

router.use(genericErrorHandler);

export default router;
