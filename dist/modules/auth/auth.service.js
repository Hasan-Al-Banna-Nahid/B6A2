"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const index_1 = require("./../../config/index");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_1 = require("../../server");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = index_1.config.jwtSecret;
class AuthService {
    async register(data) {
        const { name, email, phone, password, role } = data;
        console.log(data);
        const hashed = await bcryptjs_1.default.hash(password, 12);
        const query = `
      INSERT INTO users (name, email, password, phone, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
        const values = [name, email, hashed, phone, role || "user"];
        const result = await server_1.pool.query(query, values);
        return result.rows[0];
    }
    async login(email, password) {
        const result = await server_1.pool.query(`SELECT * FROM users WHERE email = $1`, [
            email,
        ]);
        const user = result.rows[0];
        if (!user)
            throw new Error("User not found");
        const match = await bcryptjs_1.default.compare(password, user.password);
        if (!match)
            throw new Error("Incorrect password");
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, {
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
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map