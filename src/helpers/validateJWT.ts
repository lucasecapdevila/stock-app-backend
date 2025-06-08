import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../types/index.types.js";
import jwt from "jsonwebtoken";
import 'dotenv/config'

declare global {
  namespace Express {
    interface Request {
      username?: string;
    }
  }
}

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({ msg: "No hay token, permiso no valido" });
  }
  
  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT as string) as JwtPayload;
    req.username = payload.username;
    next();
  } catch (error: any) {
    console.error('Error al verificar el token', error.message);
    if(error.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: "Token no valido" });
    } else if(error.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: "Token expirado" });
    } else {
      return res.status(401).json({ msg: "Token no valido" });
    }
  }
};

export default validateJWT;
