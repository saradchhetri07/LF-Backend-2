import express from "express";
import { login, signUp, refresh } from "../controllers/auth.controllers";
import { validateReqBody } from "../middlewares/validator";
import {
  createUserBodySchema,
  loginUserBodySchema,
} from "../schema/user.schema";

const router = express();

router.post("/signUp", validateReqBody(createUserBodySchema), signUp);

router.post("/login", validateReqBody(loginUserBodySchema), login);
router.post("/refresh", refresh);

export default router;
