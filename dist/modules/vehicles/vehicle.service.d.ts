export declare class VehicleService {
    createVehicle(data: any): Promise<any>;
    getAllVehicles(): Promise<any[]>;
    getVehicleById(id: number): Promise<any>;
    updateVehicle(id: number, data: any): Promise<any>;
    updateAvailability(id: number, status: "available" | "booked"): Promise<any>;
    deleteVehicle(id: number): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=vehicle.service.d.ts.map