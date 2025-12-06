"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vehicle_controller_1 = require("./vehicle.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = express_1.default.Router();
const controller = new vehicle_controller_1.VehicleController();
router.post("/vehicles", (0, auth_middleware_1.authMiddleware)("admin"), controller.createVehicle);
router.get("/vehicles", controller.getAllVehicles);
router.get("/vehicles/:id", controller.getVehicleById);
router.put("/vehicles/:id", (0, auth_middleware_1.authMiddleware)("admin"), controller.updateAvailability);
router.delete("/vehicles/:id", (0, auth_middleware_1.authMiddleware)("admin"), controller.deleteVehicle);
exports.default = router;
//# sourceMappingURL=vehices.routes.js.map