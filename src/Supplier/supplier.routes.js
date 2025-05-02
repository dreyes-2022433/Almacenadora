import {router} from 'express';
import { addSupplier,  getSuppliers } from './supplier.controller.js';

const api = router()

api.post("/suppliers", addSupplier) // Agregar un nuevo proveedor
api.get("/suppliers", getSuppliers) // Obtener todos los proveedores
