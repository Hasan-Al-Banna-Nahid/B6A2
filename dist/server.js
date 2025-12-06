"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const config_1 = require("./config");
const app_1 = __importDefault(require("./app"));
exports.pool = new pg_1.Pool({
    connectionString: config_1.config.dbConnectionString,
    ssl: { rejectUnauthorized: false },
});
const connectDB = async () => {
    try {
        await exports.pool.query("SELECT NOW()");
        console.log("📦 PostgreSQL connected successfully");
    }
    catch (error) {
        console.error("❌ PostgreSQL connection failed:", error);
        process.exit(1);
    }
};
app_1.default.listen(config_1.config.port, () => {
    console.log(`🚀 Server is running on port http://localhost:${config_1.config.port}`);
});
connectDB();
//# sourceMappingURL=server.js.map