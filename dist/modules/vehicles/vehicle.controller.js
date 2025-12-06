"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleController = void 0;
const vehicle_service_1 = require("./vehicle.service");
const vehicleService = new vehicle_service_1.VehicleService();
class VehicleController {
    async createVehicle(req, res) {
        try {
            const vehicle = await vehicleService.createVehicle(req.body);
            res.status(201).json(vehicle);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    async getAllVehicles(req, res) {
        const vehicles = await vehicleService.getAllVehicles();
        res.json(vehicles);
    }
    async getVehicleById(req, res) {
        const id = Number(req.params.id);
        const vehicle = await vehicleService.getVehicleById(id);
        if (!vehicle)
            return res.status(404).json({ message: "Vehicle not found" });
        res.json(vehicle);
    }
    async updateAvailability(req, res) {
        const id = Number(req.params.id);
        const { status } = req.body;
        const updated = await vehicleService.updateAvailability(id, status);
        res.json(updated);
    }
    async deleteVehicle(req, res) {
        const id = Number(req.params.id);
        const result = await vehicleService.deleteVehicle(id);
        res.json(result);
    }
}
exports.VehicleController = VehicleController;
//# sourceMappingURL=vehicle.controller.js.map