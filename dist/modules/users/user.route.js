"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = express_1.default.Router();
const controller = new user_controller_1.UserController();
router.post("/users", controller.handleCreateUser);
router.get("/users", (0, auth_middleware_1.authMiddleware)("admin"), controller.handleGetAllUser);
router.get("/users/:id", (0, auth_middleware_1.authMiddleware)("admin"), controller.handleGetUserById);
router.put("/users/:id", (0, auth_middleware_1.authMiddleware)("admin"), controller.handleUpdateUser);
router.delete("/users/:id", (0, auth_middleware_1.authMiddleware)("admin"), controller.handleDeleteUser);
exports.default = router;
//# sourceMappingURL=user.route.js.map