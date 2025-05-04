import { body } from "express-validator";
import { validateErrorWithoutImg} from "./validate.error.js";

/*-------------------- VALIDACIÓN DE ENTRADA DE PRODUCTOS ---------------- */
export const validateRegisEntry = [
    body('product', 'El identificador del producto no puede ir vacio')
        .notEmpty()
        .isMongoId().withMessage('Debe ser un ID válido, no se encuentra en la DB'),
    body('quantity', 'La cantidad del producto no puede ir vacio')
        .notEmpty()
        .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero positivo'),
    body('entryDate', 'La fecha de salida no puede ir vacia')
        .notEmpty()
        .isISO8601().withMessage('La fecha debe tener un formato válido Ejemplo: 2025-05-03'),
    body('employee', 'El empleado no puede ir vacio')
        .notEmpty()
        .isMongoId().withMessage('Debe ser un ID válido, no se encuentra en la DB'),
    validateErrorWithoutImg

]
/*-------------------- VALIDACIÓN DE SALIDA DE PRODUCTOS ---------------- */
export const validateRegisExit = [
    body('productId', 'El identificador del producto no puede ir vacio')
        .notEmpty()
        .isMongoId().withMessage('Debe ser un ID válido, no se encuentra en la DB'),
    body('quantity', 'La cantidad del producto no puede ir vacio')
        .notEmpty()
        .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero positivo'),
    body('exitDate', 'La fecha de salida no puede ir vacia')
        .notEmpty()
        .isISO8601().withMessage('La fecha debe tener un formato válido, ejemplo: 2025-05-03'),
    body('employee', 'El empleado no puede ir vacio')
        .notEmpty()
        .isMongoId().withMessage('Debe ser un ID válido, no se encuentra en la DB'),
    body('reason', 'La razón no puede ir vacio')
        .notEmpty()
        .isLength({ min: 3 }).withMessage('La razón debe tener al menos 3 caracteres'),
    body('destination', 'El destino del producto no puede ir vacio')
        .notEmpty()
        .isLength({ min: 3 }).withMessage('El destino debe tener al menos 3 caracteres'),
    validateErrorWithoutImg
]