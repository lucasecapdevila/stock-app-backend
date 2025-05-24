import { Request, Response, NextFunction } from "express";
import validator from "express-validator";

const validationResult = (req: Request, res: Response, next: NextFunction): void => {
    const errors = (validator as any).validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errores: errors.array() });
        return;
    }

    next();
};

export default validationResult;