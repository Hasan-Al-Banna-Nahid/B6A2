import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      console.log("Register hit", req.body);
      const user = await authService.register(req.body);
      res.status(201).json({ message: "User created", user });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const data = await authService.login(email, password);
      res.json(data);
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }

  async signOut(req: Request, res: Response) {
    const result = authService.signOut();
    res.json(result);
  }
}
