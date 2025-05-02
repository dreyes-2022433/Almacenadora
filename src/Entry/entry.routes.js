import { Router } from "express"
import { registerEntry,registerExit, getMovements } from "./entry.controller"

const api = Router()

api.post("/entry", registerEntry) // Registrar una entrada de producto
api.post("/exit", registerExit) // Registrar una salida de producto
api.get("/movements", getMovements) // Obtener todos los movimientos de productos

export default api