import Product from '../Products/product.model.js';
import Movement from './movement.model.js'; // Modelo para registrar movimientos

// Registro de entradas
export const registerEntry = async (req, res) => {
    try {
        const { productId, quantity, entryDate, employee } = req.body;

        // Actualizar el stock del producto
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        product.stock += quantity;
        await product.save();

        // Registrar el movimiento de entrada
        const entry = new Movement({
            productId,
            type: 'entry',
            quantity,
            date: entryDate,
            employee,
        });
        await entry.save();

        res.status(201).json({ message: 'Entrada registrada exitosamente', entry });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar la entrada', error });
    }
};

// Registro de salidas
export const registerExit = async (req, res) => {
    try {
        const { productId, quantity, exitDate, employee, reason, destination } = req.body;

        // Actualizar el stock del producto
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Stock insuficiente' });
        }
        product.stock -= quantity;
        await product.save();

        // Registrar el movimiento de salida
        const exit = new Movement({
            productId,
            type: 'exit',
            quantity,
            date: exitDate,
            employee,
            reason,
            destination,
        });
        await exit.save();

        // Verificar si el stock está por debajo del nivel mínimo
        const MIN_STOCK_LEVEL = 10; // Nivel mínimo de stock definido
        if (product.stock < MIN_STOCK_LEVEL) {
            const notification = new Notification({
                type: 'low_stock',
                product: productId,
                message: `El stock del producto "${product.name}" es bajo (${product.stock} unidades).`,
            });
            await notification.save();
        }

        res.status(201).json({ message: 'Salida registrada exitosamente', exit });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar la salida', error });
    }
};

// Historial de movimientos
export const getMovements = async (req, res) => {
    try {
        const { productId } = req.query;

        // Filtrar movimientos por producto si se proporciona un ID
        const query = productId ? { productId } : {};
        const movements = await Movement.find(query).sort({ date: -1 });

        res.status(200).json({ message: 'Historial de movimientos obtenido', movements });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el historial de movimientos', error });
    }
};