
import Notification from './notification.model.js';

export const getUnreadNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ status: 'unread' }).populate('product');
        res.status(200).json({ message: 'Notificaciones obtenidas', notifications });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener notificaciones', error });
    }
};

export const markNotificationAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(id, { status: 'read' }, { new: true });
        if (!notification) {
            return res.status(404).json({ message: 'Notificación no encontrada' });
        }
        res.status(200).json({ message: 'Notificación marcada como leída', notification });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la notificación', error });
    }
};