// src/modules/vehicle/vehicle.controller.ts
import { Request, Response } from "express";
import { VehicleService } from "./vehicle.service";

const vehicleService = new VehicleService();

export class VehicleController {
  async createVehicle(req: Request, res: Response) {
    try {
      const vehicle = await vehicleService.createVehicle(req.body);
      res.status(201).json(vehicle);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAllVehicles(req: Request, res: Response) {
    const vehicles = await vehicleService.getAllVehicles();
    res.json(vehicles);
  }

  async getVehicleById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const vehicle = await vehicleService.getVehicleById(id);

    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    res.json(vehicle);
  }

  async updateAvailability(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { status } = req.body;

    const updated = await vehicleService.updateAvailability(id, status);
    res.json(updated);
  }

  async deleteVehicle(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await vehicleService.deleteVehicle(id);
    res.json(result);
  }
}
