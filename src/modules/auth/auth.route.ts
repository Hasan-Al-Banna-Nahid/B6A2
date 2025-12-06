import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();
const controller = new AuthController();
router.post("/signup", controller.register);
router.post("/signin", controller.login);
router.post("/signout", controller.signOut);

export default router;
