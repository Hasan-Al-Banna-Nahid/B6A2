import express from "express";
import { BookingController } from "./booking.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = express.Router();
const controller = new BookingController();

router.post(
  "/bookings",
  authMiddleware("user", "admin"),
  controller.createBooking
);

router.get(
  "/bookings",
  authMiddleware("user", "admin"),
  controller.getBookings
);

router.get(
  "/bookings/:bookingId",
  authMiddleware("user", "admin"),
  controller.getBooking
);

router.put(
  "/bookings/:bookingId",
  authMiddleware("user", "admin"),
  controller.updateBooking
);

export default router;
