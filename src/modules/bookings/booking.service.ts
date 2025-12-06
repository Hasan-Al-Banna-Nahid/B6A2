import { pool } from "../..";

export class BookingService {
  async createBooking(data: any) {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = data;

    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES users(id) ON DELETE CASCADE,
        vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL,
        total_price NUMERIC CHECK(total_price > 0) NOT NULL,
        status VARCHAR(10) CHECK(status IN ('active','cancelled','returned')) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const vehicleRes = await pool.query("SELECT * FROM vehicles WHERE id=$1", [
      vehicle_id,
    ]);
    const vehicle = vehicleRes.rows[0];
    if (!vehicle) throw new Error("Vehicle not found");
    if (vehicle.availability_status !== "available")
      throw new Error("Vehicle not available");

    const startDate = new Date(rent_start_date);
    const endDate = new Date(rent_end_date);
    if (endDate <= startDate)
      throw new Error("End date must be after start date");

    const durationDays =
      Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
      ) || 1;
    const totalPrice = durationDays * vehicle.daily_rent_price;

    const bookingRes = await pool.query(
      `INSERT INTO bookings
       (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
       VALUES ($1,$2,$3,$4,$5,'active') RETURNING *`,
      [customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice]
    );

    await pool.query(
      "UPDATE vehicles SET availability_status='booked' WHERE id=$1",
      [vehicle_id]
    );

    return bookingRes.rows[0];
  }

  async getBookings(user: any) {
    if (user.role === "admin") {
      const res = await pool.query("SELECT * FROM bookings ORDER BY id DESC");
      return res.rows;
    } else {
      const res = await pool.query(
        "SELECT * FROM bookings WHERE customer_id=$1 ORDER BY id DESC",
        [user.id]
      );
      return res.rows;
    }
  }

  async getBookingById(bookingId: number, user: any) {
    const res = await pool.query("SELECT * FROM bookings WHERE id=$1", [
      bookingId,
    ]);
    const booking = res.rows[0];
    if (!booking) throw new Error("Booking not found");

    if (user.role !== "admin" && booking.customer_id !== user.id)
      throw new Error("Not authorized to view this booking");

    return booking;
  }

  async updateBooking(bookingId: number, status: string) {
    const res = await pool.query("SELECT * FROM bookings WHERE id=$1", [
      bookingId,
    ]);
    const booking = res.rows[0];
    if (!booking) throw new Error("Booking not found");

    const updateRes = await pool.query(
      "UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *",
      [status, bookingId]
    );

    if (status === "returned" || status === "cancelled") {
      await pool.query(
        "UPDATE vehicles SET availability_status='available' WHERE id=$1",
        [booking.vehicle_id]
      );
    }

    return updateRes.rows[0];
  }

  async cancelBooking(bookingId: number, user: any) {
    const res = await pool.query("SELECT * FROM bookings WHERE id=$1", [
      bookingId,
    ]);
    const booking = res.rows[0];
    if (!booking) throw new Error("Booking not found");

    if (user.role !== "admin" && booking.customer_id !== user.id)
      throw new Error("Not authorized to cancel this booking");

    const today = new Date();
    const startDate = new Date(booking.rent_start_date);
    if (today >= startDate)
      throw new Error("Cannot cancel booking after start date");

    const updateRes = await pool.query(
      "UPDATE bookings SET status='cancelled' WHERE id=$1 RETURNING *",
      [bookingId]
    );

    await pool.query(
      "UPDATE vehicles SET availability_status='available' WHERE id=$1",
      [booking.vehicle_id]
    );

    return updateRes.rows[0];
  }
}
