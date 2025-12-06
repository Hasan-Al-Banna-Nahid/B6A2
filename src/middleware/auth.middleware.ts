import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "../config";
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authMiddleware = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ success: false, message: "Not Authenticated" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(
        token as string,
        config.jwtSecret as string
      ) as any;

      req.user = { id: decoded.id, role: decoded.role };

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }

      next();
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ success: false, message: "Not Authenticated", error });
    }
  };
};
