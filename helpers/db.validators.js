import { isValidObjectId } from 'mongoose'
import User from '../src/User/user.model.js'

export const isValidMongoId = async (id = '') => {
    if (!isValidObjectId(id)) {
        throw new Error('Invalid MongoDB ObjectId')
    }
}

export const existEmail = async (email = '') => {
    const userFound = await User.findOne({ email })
    if (userFound) {
        throw new Error(`The email '${email}' is already registered`)
    }
}

export const existUsername = async (username = '') => {
    const userFound = await User.findOne({ username })
    if (userFound) {
        throw new Error(`The username '${username}' is already taken`)
    }
}

export const existPhone = async (phone = '') => {
    const userFound = await User.findOne({ phone })
    if (userFound) {
        throw new Error(`The phone number '${phone}' is already registered`)
    }
}
