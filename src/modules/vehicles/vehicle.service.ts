import { pool } from "../..";

export class VehicleService {
  async createVehicle(data: any) {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(100) NOT NULL,
        type VARCHAR(20) CHECK(type IN ('car','bike','van','SUV')) NOT NULL,
        registration_number VARCHAR(50) UNIQUE NOT NULL,
        daily_rent_price NUMERIC CHECK(daily_rent_price > 0) NOT NULL,
        availability_status VARCHAR(20) DEFAULT 'available' CHECK(availability_status IN ('available','booked')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const { vehicle_name, type, registration_number, daily_rent_price } = data;

    const result = await pool.query(
      `
      INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price)
      VALUES ($1, $2, $3, $4) RETURNING *;
      `,
      [vehicle_name, type, registration_number, daily_rent_price]
    );

    return result.rows[0];
  }

  async getAllVehicles() {
    const result = await pool.query("SELECT * FROM vehicles ORDER BY id DESC");
    return result.rows;
  }

  async getVehicleById(id: number) {
    const result = await pool.query("SELECT * FROM vehicles WHERE id=$1", [id]);
    return result.rows[0];
  }

  async updateVehicle(id: number, data: any) {
    const fields = Object.keys(data);
    const values = Object.values(data);

    if (fields.length === 0) return null;

    const setString = fields.map((f, i) => `${f}=$${i + 1}`).join(", ");
    const query = `UPDATE vehicles SET ${setString} WHERE id=$${
      fields.length + 1
    } RETURNING *`;
    const result = await pool.query(query, [...values, id]);

    return result.rows[0];
  }

  async updateAvailability(id: number, status: "available" | "booked") {
    const result = await pool.query(
      `UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING *`,
      [status, id]
    );
    return result.rows[0];
  }

  async deleteVehicle(id: number) {
    await pool.query(`DELETE FROM vehicles WHERE id=$1 CASCADE`, [id]);
    return { message: "Vehicle deleted successfully" };
  }
}
