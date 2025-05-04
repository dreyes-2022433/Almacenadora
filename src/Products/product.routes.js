import { Router } from "express"
import { addProduct, editProduct, deleteProduct, searchProducts } from "./product.controller.js"
import { validateAddProduct, validateUpdateProduct } from "../../helpers/validators.js"

const api = Router()

// Agregar un nuevo producto
api.post(
    "/", 
    [
        validateAddProduct
    ],
    addProduct
) 

// Editar un producto existente
api.put(
    "/:id", 
    [
        validateUpdateProduct
    ],
    editProduct) 

// Eliminar un producto
api.delete(
    "/",
    [

    ], 
    deleteProduct
) 

// Buscar y filtrar productos
api.get(
    "/products", 
    [

    ],
    searchProducts
) 

export default api