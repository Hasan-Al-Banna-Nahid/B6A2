import { Request, Response } from "express";
import { UserService } from "./user.service";

const userService = new UserService();

export class UserController {
  async handleCreateUser(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: "User creation failed", details: err });
    }
  }

  async handleGetAllUser(req: Request, res: Response) {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  }

  async handleGetUserById(req: Request, res: Response) {
    const user = await userService.getUserById(Number(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  }

  async handleUpdateUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await userService.updateUser(id, req.body);

    if (!updated) return res.status(404).json({ message: "User not found" });

    res.status(200).json(updated);
  }

  async handleDeleteUser(req: Request, res: Response) {
    const deleted = await userService.deleteUser(Number(req.params.id));

    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted", deleted });
  }
}
