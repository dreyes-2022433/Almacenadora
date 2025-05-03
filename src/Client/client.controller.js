import Client from './client.model.js';



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


export const getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json({ message: 'Clientes obtenidos exitosamente', clients });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los clientes', error });
    }
};