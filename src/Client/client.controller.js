import Client from './client.model.js';

export const addClient = async (req, res) => {
    try {
        const { name, contact, company } = req.body
        const newClient = new Client({ name, contact, company })
        await newClient.save()
        res.status(201).send(
            { 
                message: 'Cliente registrado exitosamente', 
                client: newClient 
            }
        )
    } catch (error) {
        res.status(500).send(
            { message: 'Error al registrar el cliente', 
                error 
            }
        )
    }
}

export const getClients = async (req, res) => {
    try {
        const clients = await Client.find()
        res.status(200).send(
            { 
                message: 'Clientes obtenidos exitosamente', 
                clients 
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                 message: 'Error al obtener los clientes', 
                 error 
            }
        )
    }
}