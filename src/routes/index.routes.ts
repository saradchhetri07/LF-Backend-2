import express from "express";
import authRouter from "./auth.routes";
import todosRouter from "../routes/todos.routes";
import userRouter from "../routes/user.routes";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/todos", todosRouter);

export default router;
