import express from "express";
import { VehicleController } from "./vehicle.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = express.Router();
const controller = new VehicleController();

router.post("/vehicles", authMiddleware("admin"), controller.createVehicle);
router.get("/vehicles", controller.getAllVehicles);
router.get("/vehicles/:id", controller.getVehicleById);
router.put(
  "/vehicles/:id",
  authMiddleware("admin"),
  controller.updateAvailability
);
router.delete(
  "/vehicles/:id",
  authMiddleware("admin"),
  controller.deleteVehicle
);

export default router;
