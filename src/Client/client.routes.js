import { Router } from "express"
import { addClient, getClients } from "./client.controller.js"

const api = Router()

api.post("/", addClient) // Registrar un nuevo cliente
api.get("/", getClients) // Obtener todos los clientes


export default api