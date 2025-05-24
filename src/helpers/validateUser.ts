import validator from "express-validator";
import validationResult from "./validationResult.js";

const validateUser = [
  (validator as any).check("username")
    .notEmpty()
    .withMessage("El usuario es un dato obligatorio")
    .isString()
    .withMessage("El usuario debe ser un string")
    .isLength({ min: 5, max: 25 })
    .withMessage("El usuario debe tener entre 5 y 25 caracteres"),
  (validator as any).check("password")
    .notEmpty()
    .withMessage("La contraseña es un dato obligatorio")
    .isString()
    .withMessage("La contraseña debe ser un string")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("La contraseña debe contener al menos una mayúscula, una minúscula y un número"),
  validationResult
];

export default validateUser;