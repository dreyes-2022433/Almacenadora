import Product from './product.model.js';

// Agregar un nuevo producto
export const addProduct = async (req, res) => {
    try {
        const { name, category, stock, supplier, entryDate,expirationDate, unitPrice } = req.body
        const newProduct = new Product({ name, category, stock, supplier, entryDate, expirationDate,unitPrice });
        await newProduct.save();
        res.status(201).json({ message: 'Producto agregado exitosamente', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto', error });
    }
};

// Editar un producto existente
export const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto actualizado exitosamente', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado exitosamente', product: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};

// Buscar y filtrar productos
export const searchProducts = async (req, res) => {
    try {
        const { name, category, entryDate } = req.query;
        const query = {};
        if (name) query.name = { $regex: name, $options: 'i' }; // Búsqueda por nombre (insensible a mayúsculas)
        if (category) query.category = category;
        if (entryDate) query.entryDate = entryDate;

        const products = await Product.find(query);
        res.status(200).json({ message: 'Productos encontrados', products });
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar productos', error });
    }
};