import { Router } from "express"
import { registerEntry,registerExit, getEntrys } from "./entry.controller.js"
import { validateRegisEntry, validateRegisExit } from "../../helpers/validators.js"

const api = Router()

api.post("/entry",[validateRegisEntry], registerEntry) // Registrar una entrada de producto
api.post("/exit",[validateRegisExit], registerExit) // Registrar una salida de producto
api.get("/movements", getEntrys) // Obtener todos los movimientos de productos

export default api