import { config } from "./../../config/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../..";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = config.jwtSecret as string;

export class AuthService {
  async register(data: any) {
    const { name, email, phone, password, role } = data;
    console.log(data);
    const hashed = await bcrypt.hash(password, 12);

    const query = `
      INSERT INTO users (name, email, password, phone, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [name, email, hashed, phone, role || "user"];

    const result = await pool.query(query, values);

    return result.rows[0];
  }

  async login(email: string, password: string) {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    const user = result.rows[0];
    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Incorrect password");

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "30d",
    });

    return {
      token,
      user,
    };
  }

  signOut() {
    return { message: "Signed out successfully" };
  }
}
