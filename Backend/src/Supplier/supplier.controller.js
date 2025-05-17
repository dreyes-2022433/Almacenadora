import Supplier from './supplier.model.js'
import Client from '../Client/client.model.js'


export const addSupplier = async (req, res) => {
    try {
        const { name, contact } = req.body
        const newSupplier = new Supplier(
            { 
                name, 
                contact
            }
        )
        await newSupplier.save()
        res.status(201).send(
            { 
                message: 'Proveedor registrado exitosamente',
                supplier: newSupplier 
            }
        )

    } catch (error) {
        res.status(500).send(
            { 
                message: 'Error al registrar el proveedor', 
                error 
            }
        )
    }
}

export const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find().populate('products')

        res.status(200).send({
                message: 'Proveedores obtenidos exitosamente',
                suppliers
            }
        )
    } catch (error) {
            res.status(500).send({
                message: 'Error al obtener los proveedores',
                error
            }
        )
    }
}



