"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const userService = new user_service_1.UserService();
class UserController {
    async handleCreateUser(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        }
        catch (err) {
            res.status(400).json({ error: "User creation failed", details: err });
        }
    }
    async handleGetAllUser(req, res) {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    }
    async handleGetUserById(req, res) {
        const user = await userService.getUserById(Number(req.params.id));
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    }
    async handleUpdateUser(req, res) {
        const id = Number(req.params.id);
        const updated = await userService.updateUser(id, req.body);
        if (!updated)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json(updated);
    }
    async handleDeleteUser(req, res) {
        const deleted = await userService.deleteUser(Number(req.params.id));
        if (!deleted)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted", deleted });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map