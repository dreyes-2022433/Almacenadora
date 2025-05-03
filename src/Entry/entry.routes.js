import { Router } from "express"
import { registerEntry,registerExit, getEntrys } from "./entry.controller.js"

const api = Router()

api.post("/entry", registerEntry) // Registrar una entrada de producto
api.post("/exit", registerExit) // Registrar una salida de producto
api.get("/movements", getEntrys) // Obtener todos los movimientos de productos

export default api