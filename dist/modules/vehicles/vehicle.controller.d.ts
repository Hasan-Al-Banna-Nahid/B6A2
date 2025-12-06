import { Request, Response } from "express";
export declare class VehicleController {
    createVehicle(req: Request, res: Response): Promise<void>;
    getAllVehicles(req: Request, res: Response): Promise<void>;
    getVehicleById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateAvailability(req: Request, res: Response): Promise<void>;
    deleteVehicle(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=vehicle.controller.d.ts.map