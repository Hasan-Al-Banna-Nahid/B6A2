import express from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = express.Router();
const controller = new UserController();

router.post("/users", controller.handleCreateUser);
router.get("/users", authMiddleware("admin"), controller.handleGetAllUser);
router.get("/users/:id", authMiddleware("admin"), controller.handleGetUserById);
router.put("/users/:id", authMiddleware("admin"), controller.handleUpdateUser);
router.delete(
  "/users/:id",
  authMiddleware("admin"),
  controller.handleDeleteUser
);

export default router;
