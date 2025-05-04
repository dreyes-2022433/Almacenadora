import { body } from "express-validator";
import { validateErrorWithoutImg} from "./validate.error.js";
import { existEmail } from "./db.validators.js";

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

/*-------------------- VALIDACIÓN DE PRODUCTOS ---------------- */
export const validateAddProduct = [
    body('name', 'El nombre no puede ir vacio')
        .notEmpty(),
    body('category', 'La categoria no puede ir vacia')
        .notEmpty(),
    body('stock', 'El stock no puede ir vacio')
        .notEmpty()
        .isInt({ min: 0 })
        .withMessage('El stock tiene que ser un número valido'),
    body('supplier', 'El proveedor no puede ir vacio')
        .notEmpty()
        .isMongoId()
        .withMessage('El proveedor debe ser un ID valido'),
    body('entryDate', 'La fecha de entrada no puede ir vacia')
        .notEmpty()
        .isISO8601().withMessage('La fecha de entrada debe tener un formato válido, ejemplo: 2025-05-03'),
    body('expirationDate', 'La fecha de expiración no puede ir vacio')
        .notEmpty()
        .isISO8601().withMessage('La fecha de expiración debe tener un formato válido, ejemplo: 2025-05-03'),
    body('unitPrice', 'El precio unitario no puede ir vacio')
        .notEmpty()
        .isFloat({ min: 0 })
        .withMessage('El precio unitario tiene que ser un número valid'),
    validateErrorWithoutImg
]

export const validateUpdateProduct = [
    body('name', 'El nombre no puede ir vacio')
        .optional()
        .notEmpty(),
    body('category', 'La categoria no puede ir vacia')
        .optional()
        .notEmpty(),
    body('stock', 'El stock no puede ir vacio')
        .optional()
        .notEmpty()
        .isInt({ min: 0 })
        .withMessage('El stock tiene que ser un número valido'),
    body('supplier', 'El proveedor no puede ir vacio')
        .optional()
        .notEmpty()
        .isMongoId()
        .withMessage('El proveedor debe ser un ID valido'),
    body('entryDate', 'La fecha de entrada no puede ir vacia')
        .optional()
        .notEmpty()
        .isISO8601().withMessage('La fecha de entrada debe tener un formato válido, ejemplo: 2025-05-03'),
    body('expirationDate', 'La fecha de expiración no puede ir vacio')
        .optional()
        .notEmpty()
        .isISO8601().withMessage('La fecha de expiración debe tener un formato válido, ejemplo: 2025-05-03'),
    body('unitPrice', 'El precio unitario no puede ir vacio')
        .optional()
        .notEmpty()
        .isFloat({ min: 0 })
        .withMessage('El precio unitario tiene que ser un número valid'),
    validateErrorWithoutImg
]

/*-------------------- VALIDACIÓN DE USUARIOS ---------------- */
export const validRegisterUser = [
    body('name', 'Name is required and must not exceed 25 characters')
        .notEmpty()
        .isLength({ max: 25 }),
    body('email', 'Valid email is required and must not exceed 50 characters')
        .notEmpty()
        .isEmail()
        .isLength({ max: 50 }),
    body('password', 'Password is required and must be at least 6 characters')
        .notEmpty()
        .isLength({ min: 6 }),
    body('email').custom(existEmail),
    validateErrorWithoutImg
]

export const validUpdateUser = [
    body('name', 'Name must not exceed 25 characters')
        .optional()
        .isLength({ max: 25 }),
    body('email', 'Email must not exceed 50 characters')
        .optional()
        .isEmail()
        .isLength({ max: 50 }),
    validateErrorWithoutImg
]