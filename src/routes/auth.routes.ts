import express from "express";
import { login, signUp, refresh } from "../controllers/auth.controllers";

const router = express();

router.post("/signUp", signUp);
router.post("/login", login);
router.post("/refresh", refresh);

export default router;
