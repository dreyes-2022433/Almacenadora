import { Router } from "express"
import { addProduct, editProduct, deleteProduct, searchProducts } from "./product.controller.js"

const api = Router()

api.post("/", addProduct) // Agregar un nuevo producto
api.put("/products/:id", editProduct) // Editar un producto existente
api.delete("/products/:id", deleteProduct) // Eliminar un producto
api.get("/products", searchProducts) // Buscar y filtrar productos

export default api