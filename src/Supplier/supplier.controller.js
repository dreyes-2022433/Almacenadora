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

// Registrar un nuevo cliente
export const addClient = async (req, res) => {
    try {
        const { name, contact, company } = req.body;
        const newClient = new Client({ name, contact, company });
        await newClient.save();
        res.status(201).json({ message: 'Cliente registrado exitosamente', client: newClient });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el cliente', error });
    }
};

// Obtener todos los clientes
export const getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json({ message: 'Clientes obtenidos exitosamente', clients });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los clientes', error });
    }
};

