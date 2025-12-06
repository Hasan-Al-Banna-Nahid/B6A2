import { pool } from "./../../server";
import bcrypt from "bcryptjs";

export class UserService {
  async createUser(data: any) {
    const { password, name, phone, email, role } = data;

    const hashedPassword = await bcrypt.hash(password, 12);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(50) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          phone VARCHAR(15) NOT NULL,
          role VARCHAR(20) DEFAULT 'user',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const query = `
      INSERT INTO users (name, email, password, phone, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const result = await pool.query(query, [
      name,
      email,
      hashedPassword,
      phone,
      role ?? "user",
    ]);

    return result.rows[0];
  }

  async getAllUsers() {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  }

  async getUserById(id: number) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  }

  async updateUser(id: number, data: any) {
    const existingUser = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (!existingUser.rows[0]) return null;

    const updatedUser = {
      name: data.name ?? existingUser.rows[0].name,
      email: data.email ?? existingUser.rows[0].email,
      phone: data.phone ?? existingUser.rows[0].phone,
      role: data.role ?? existingUser.rows[0].role,
    };

    const query = `
    UPDATE users
    SET name = $1, email = $2, phone = $3, role = $4
    WHERE id = $5
    RETURNING *
  `;

    const values = [
      updatedUser.name,
      updatedUser.email,
      updatedUser.phone,
      updatedUser.role,
      id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async deleteUser(id: number) {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );

    return result.rows[0];
  }
}
