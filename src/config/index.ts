import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.port,
  dbConnectionString: process.env.db as string,
  jwtSecret: process.env.jwt as string,
};
