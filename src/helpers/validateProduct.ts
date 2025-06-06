import validator from "express-validator";
import validationResult from "./validationResult.js";

const validateProduct = [
  (validator as any).check("name")
    .notEmpty()
    .withMessage("El nombre es un dato obligatorio")
    .isString()
    .withMessage("El nombre debe ser un string")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 carácteres"),
  (validator as any).check("price")
    .notEmpty()
    .withMessage("El precio es un dato obligatorio")
    .isNumeric()
    .withMessage("El precio debe ser un número")
    .isInt({ min: 100, max: 10000000 })
    .withMessage("El precio debe ser un número entero entre $100 y $10000000"),
  (validator as any).check("stock")
    .notEmpty()
    .withMessage("El stock es un dato obligatorio")
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un número entero mayor o igual a 0"),
  (validator as any).check("type")
    .notEmpty()
    .withMessage("El tipo es un dato obligatorio")
    .isString()
    .withMessage("El tipo debe ser un string")
    .isIn(["Económico", "Intermedio", "Premium"])
    .withMessage("El tipo debe ser 'Económico', 'Intermedio' o 'Premium'"),
  (validator as any).check("description")
    .optional()
    .isString()
    .withMessage("La descripción debe ser un string")
    .isLength({ min: 10, max: 1000 })
    .withMessage("La descripción debe tener entre 10 y 1000 carácteres"),
  validationResult
]

export default validateProduct;