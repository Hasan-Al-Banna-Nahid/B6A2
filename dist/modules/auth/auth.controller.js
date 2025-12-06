"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const authService = new auth_service_1.AuthService();
class AuthController {
    async register(req, res) {
        try {
            console.log("Register hit", req.body);
            const user = await authService.register(req.body);
            res.status(201).json({ message: "User created", user });
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const data = await authService.login(email, password);
            res.json(data);
        }
        catch (err) {
            res.status(401).json({ error: err.message });
        }
    }
    async signOut(req, res) {
        const result = authService.signOut();
        res.json(result);
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map