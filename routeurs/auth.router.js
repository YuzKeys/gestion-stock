import { Router } from "express";
import authController from "../controlleurs/auth.controller.js"

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.route("/members").get(authController.getAllMembers);

export default authRouter;