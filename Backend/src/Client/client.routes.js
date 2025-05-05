import { Router } from "express"
import { addClient, getClients } from "./client.controller.js"
import { validAddClient } from "../../helpers/validators.js"

const api = Router()

api.post(
    "/",
    [validAddClient],
     addClient
) 
api.get(
    "/", 
    getClients
) 

export default api