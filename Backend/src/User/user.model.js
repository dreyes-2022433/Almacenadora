import { Schema,model } from "mongoose";

const userSchema = new Schema({
    name : {
        type: String,
        required: [true, 'Name is required'],
    },
    email : {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password : {
        type: String,
        required: [true, 'Password is required'],
    },
    role : {
        type: String,
        enum: ['ADMIN', 'EMPLOYEE'],
        default: 'EMPLOYEE',
    },
    status : {
        type: Boolean, 
        default: true,
    }
}, )

export default model('User', userSchema)