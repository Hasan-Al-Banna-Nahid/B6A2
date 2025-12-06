import { Pool } from "pg";
import { config } from "./config";
import app from "./app";

export const pool = new Pool({
  connectionString: config.dbConnectionString,
  ssl: { rejectUnauthorized: false },
});

const connectDB = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("📦 PostgreSQL connected successfully");
  } catch (error) {
    console.error("❌ PostgreSQL connection failed:", error);
    process.exit(1);
  }
};

app.listen(config.port, () => {
  console.log(`🚀 Server is running on port http://localhost:${config.port}`);
});
connectDB();
