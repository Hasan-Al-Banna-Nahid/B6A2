"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
const controller = new auth_controller_1.AuthController();
router.post("/signup", controller.register);
router.post("/signin", controller.login);
router.post("/signout", controller.signOut);
exports.default = router;
//# sourceMappingURL=auth.route.js.map