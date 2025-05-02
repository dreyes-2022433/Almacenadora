import express from 'express';
import { registerUser, deleteUser, findAllUsers } from './user.controller.js';

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);


// Ruta para obtener el perfil de un usuario (requiere autenticación)
router.get('/profile', findAllUsers);

// Ruta para actualizar el perfil de un usuario (requiere autenticación)
router.put('/profile', deleteUser);

export default router;