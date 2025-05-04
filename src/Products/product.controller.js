import Product from './product.model.js'
import Supplier from '../Supplier/supplier.model.js'

// Agregar un nuevo producto
export const addProduct = async (req, res) => {
    try {
        const {
            name,
            category,
            stock,
            supplier,
            entryDate,
            expirationDate,
            unitPrice
        } = req.body

        const existSupplier = await Supplier.findById(supplier)
        if (!existSupplier) {
            return res.status(404).send({
                success: false,
                message: 'Supplier not found'
            })
        }

        const newProduct = new Product({
            name,
            category,
            stock,
            supplier,
            entryDate,
            expirationDate,
            unitPrice
        })

        await newProduct.save()

        await Supplier.findByIdAndUpdate(supplier, {
            $addToSet: { products: newProduct._id } 
        })

        return res.status(201).send({
            success: true,
            message: 'Producto agregado exitosamente',
            product: newProduct
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error al agregar el producto',
            error
        })
    }
}


// Editar un producto existente
export const editProduct = async (req, res) => {
    try {
        const { id } = req.params
        const updates = req.body

        const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true })

        if (!updatedProduct) {
            return res.status(404).send(
                { 
                    success: false,
                    message: 'Producto no encontrado' 
                }
            )
        }

        if(updates.supplier){
            const existSupplier = await Supplier.findById(updates.supplier)

            if(!existSupplier){
                return res.status(404).send(
                    {
                        success: false,
                        message: 'Supplier not found'
                    }
                )
            }    
        }

        return res.status(200).send(
            { 
                success: true,
                message: 'Producto actualizado exitosamente', 
                product: updatedProduct 
            }
        )
    } catch (error) {
        return res.status(500).send(
            { 
                success: false,
                message: 'Error al actualizar el producto', 
                error 
            }
        )
    }
}

// Eliminar un producto
export const deleteProduct = async (req, res) => {
    try {
        const { id, reason } = req.body

        if(!reason){
            return res.status(400).send(
                {
                    success: false,
                    message: 'No puedes eliminar un producto sin una razon'
                }
            )
        }

        const deletedProduct = await Product.findByIdAndDelete(id)

        if (!deletedProduct) {
            return res.status(404).send(
                { 
                    success: false,
                    message: 'Producto no encontrado' 
                }
            )
        }
        return res.status(200).send(
            { 
                success: true,
                message: 'Producto eliminado exitosamente', 
                product: deletedProduct 
            }
        )
    } catch (error) {
        return res.status(500).send(
            { 
                success: false,
                message: 'Error al eliminar el producto', 
                error 
            }
        )
    }
}

// Buscar y filtrar productos
export const searchProducts = async (req, res) => {
    try {
        const { name, category, entryDate } = req.query
        const query = {}

        if (name) query.name = { $regex: name, $options: 'i' } // Búsqueda por nombre (insensible a mayúsculas)
        if (category) query.category = category
        if (entryDate) query.entryDate = entryDate

        const products = await Product.find(query)
        return res.status(200).send(
            { 
                success: true,
                message: 'Productos encontrados', 
                products 
            }
        )
    } catch (error) {
        return res.status(500).send(
            { 
                success: false,
                message: 'Error al buscar productos', 
                error 
            }
        )
    }
}