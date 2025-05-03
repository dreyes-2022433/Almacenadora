import Supplier from './supplier.model.js'; // Modelo de proveedores
import Client from '../Client/client.model.js'; // Modelo de clientes

// Registrar un nuevo proveedor
export const addSupplier = async (req, res) => {
    try {
        const { name, contact, productsSupplied } = req.body;
        const newSupplier = new Supplier({ name, contact, productsSupplied });
        await newSupplier.save();
        res.status(201).json({ message: 'Proveedor registrado exitosamente', supplier: newSupplier });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el proveedor', error });
    }
};

// Obtener todos los proveedores
export const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json({ message: 'Proveedores obtenidos exitosamente', suppliers });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los proveedores', error });
    }
};



