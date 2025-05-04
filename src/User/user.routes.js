import { Router } from 'express'
import {
  registerUser,
  loginUser,
  updateProfile,
  deleteOwnUser,
  deleteUser,
  findAllUsers
} from './user.controller.js'

import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js'
import {
  validRegisterUser,
  validUpdateUser
} from '../../helpers/validators.js'

import { body } from 'express-validator'
import { isValidMongoId } from '../../helpers/db.validators.js'
import { validateErrorWithoutImg } from '../../helpers/validate.error.js'

const api = Router()

api.post('/login', loginUser)

api.post(
  '/register',
  [validRegisterUser],
  registerUser
)

api.get(
  '/',
  [validateJwt, isAdmin],
  findAllUsers
)

api.put(
  '/profile',
  [validateJwt, validUpdateUser],
  updateProfile
)

api.delete(
  '/profile',
  [
    validateJwt,
    body('password', 'Password is required to delete your account').notEmpty(),
    validateErrorWithoutImg
  ],
  deleteOwnUser
)

api.delete(
  '/',
  [
    validateJwt,
    isAdmin,
    body('id', 'Valid Mongo ID is required').notEmpty(),
    body('id').custom(isValidMongoId),
    validateErrorWithoutImg
  ],
  deleteUser
)

export default api
