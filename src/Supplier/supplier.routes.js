import {Router} from 'express';
import { addSupplier,  getSuppliers } from './supplier.controller.js';

const api = Router()

api.post("/addsuppliers", addSupplier) // Agregar un nuevo proveedor
api.get("/suppliers", getSuppliers) // Obtener todos los proveedores


export default api