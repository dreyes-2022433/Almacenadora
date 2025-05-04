import Product from '../Products/product.model.js';
import Entry from '../Entry/entry.model.js';

// Informe de inventario
export const getInventoryReport = async (req, res) => {
    try {
        const products = await Product.find();
        const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
        const inventoryValue = products.reduce((sum, product) => sum + (product.stock * product.unitPrice || 0), 0); // Suponiendo que cada producto tiene un campo `price`

        res.status(200).json({
            message: 'Informe de inventario generado exitosamente',
            totalProducts: products.length,
            totalStock,
            inventoryValue,
            products,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al generar el informe de inventario', error });
    }
};

// Informe de movimientos de inventario
export const getEntryReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        // Filtrar movimientos por rango de fechas
        const query = {};
        if (startDate) query.date = { $gte: new Date(startDate) };
        if (endDate) query.date = { ...query.date, $lte: new Date(endDate) };

        const Entrys = await Entry.find(query).populate('product', 'name');
        const totalEntries = Entrys.filter(m => m.type === 'entry').reduce((sum, m) => sum + m.quantity, 0);
        const totalExits = Entrys.filter(m => m.type === 'exit').reduce((sum, m) => sum + m.quantity, 0);

        res.status(200).json({
            message: 'Informe de movimientos generado exitosamente',
            totalEntries,
            totalExits,
            Entrys,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al generar el informe de movimientos', error });
    }
};

// Estadísticas de productos
export const getProductStatistics = async (req, res) => {
    try {
        const Entrys = await Entry.find().populate('product', 'name');

        // Calcular productos más movidos
        const productStats = {};
        Entrys.forEach(Entry => {
            const productId = Entry.product._id;
            const productName = Entry.product.name;
            if (!productStats[productId]) {
                productStats[productId] = { name: productName, totalEntrys: 0 };
            }
            productStats[productId].totalEntrys += parseFloat(Entry.quantity);
        });

        const mostMovedProducts = Object.values(productStats).sort((a, b) => b.totalEntrys - a.totalEntrys);

        res.status(200).json({
            message: 'Estadísticas de productos generadas exitosamente',
            mostMovedProducts,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al generar las estadísticas de productos', error });
    }
};

