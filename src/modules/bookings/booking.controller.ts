import { Request, Response } from "express";
import { BookingService } from "./booking.service";

const bookingService = new BookingService();

export class BookingController {
  async createBooking(req: Request, res: Response) {
    try {
      if (!req.user) {
        res.status(401).json({ error: "User not authenticated" });
        return;
      }
      const data = { ...req.body, customer_id: req.user.id }; // customer_id from logged-in user
      const booking = await bookingService.createBooking(data);
      res.status(201).json(booking);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async getBookings(req: Request, res: Response) {
    try {
      const bookings = await bookingService.getBookings(req.user);
      res.status(200).json(bookings);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async getBooking(req: Request, res: Response) {
    try {
      const bookingId = Number(req.params.bookingId);
      const booking = await bookingService.getBookingById(bookingId, req.user);
      res.status(200).json(booking);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async updateBooking(req: Request, res: Response) {
    try {
      const bookingId = Number(req.params.bookingId);
      const { status } = req.body;

      let updated;
      if (status === "cancelled") {
        updated = await bookingService.cancelBooking(bookingId, req.user);
      } else {
        updated = await bookingService.updateBooking(bookingId, status);
      }

      res.status(200).json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
