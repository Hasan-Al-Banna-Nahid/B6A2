"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const authMiddleware = (...roles) => {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res
                    .status(401)
                    .json({ success: false, message: "Not Authenticated" });
            }
            const token = authHeader.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
            req.user = { id: decoded.id, role: decoded.role };
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ success: false, message: "Forbidden" });
            }
            next();
        }
        catch (error) {
            console.log(error);
            return res
                .status(401)
                .json({ success: false, message: "Not Authenticated", error });
        }
    };
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map