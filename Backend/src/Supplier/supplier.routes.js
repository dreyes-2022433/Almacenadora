import {Router} from 'express'
import { addSupplier,  getSuppliers } from './supplier.controller.js'
import { validAddSupplier } from "../../helpers/validators.js"

const api = Router()

api.post(
    "/addsuppliers", 
    [validAddSupplier],
    addSupplier
) 
api.get(
    "/suppliers", 
    getSuppliers
) 


export default api