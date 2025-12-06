import express, { Request, Response } from "express";
import userRouter from "./modules/users/user.route";
import authRoutes from "./modules/auth/auth.route";
import vehicleRoutes from "./modules/vehicles/vehices.routes";
import bookingRoutes from "./modules/bookings/booking.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, B6A2!");
});
app.use("/api/v1", userRouter);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", vehicleRoutes);
app.use("/api/v1", bookingRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).send("Route not found");
});
export default app;
