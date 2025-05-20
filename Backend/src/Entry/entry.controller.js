import Product from '../Products/product.model.js';
import User from '../User/user.model.js'
import Entry from './entry.model.js'; // Modelo para registrar movimientos

// Registro de entradas
export const registerEntry = async (req, res) => {
    try {
        const { product, quantity, entryDate, employee } = req.body;

        // Actualizar el stock del producto
        const findproduct = await Product.findById(product);
        if (!findproduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Verificar si el empleado existe
        const findEmployee = await User.findById(employee);
        if (!findEmployee) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }

        findproduct.stock += parseFloat(quantity);
        await findproduct.save();

        // Registrar el movimiento de entrada
        const entry = new Entry({
            product,
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

         // Verificar si el empleado existe
         const findEmployee = await User.findById(employee);
         if (!findEmployee) {
             return res.status(404).json({ message: 'Empleado no encontrado' });
         }

        // Actualizar el stock del producto
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Stock insuficiente' });
        }
        product.stock -= parseFloat(quantity);
        await product.save();

        // Registrar el movimiento de salida
        const exit = new Entry({
            product: productId,
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
export const getEntrys = async (req, res) => {
  try {
    const Entrys = await Entry.find()
      .populate('employee', 'name')
      .populate('product', 'name')
      .sort({ date: -1 });

    res.status(200).json({ message: 'Historial de movimientos obtenido', Entrys });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el historial de movimientos', error });
  }
};