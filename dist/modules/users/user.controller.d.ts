import { Request, Response } from "express";
export declare class UserController {
    handleCreateUser(req: Request, res: Response): Promise<void>;
    handleGetAllUser(req: Request, res: Response): Promise<void>;
    handleGetUserById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    handleUpdateUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    handleDeleteUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=user.controller.d.ts.map