import express from 'express';
import { getUnreadNotifications, markNotificationAsRead } from './notification.controller.js';

const router = express.Router();

router.get('/unread', getUnreadNotifications); // Obtener notificaciones no leídas
router.patch('/:id/read', markNotificationAsRead); // Marcar notificación como leída

export default router;