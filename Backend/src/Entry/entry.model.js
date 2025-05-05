import { Schema, model } from "mongoose"

const entrySchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required'],
    },
    type: {
        type: String,
        enum: ['entry', 'exit'],
        default: 'entry',
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
    },
    Date: {
        type: Date,
        default: () => {
            const today = new Date();
            return new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Solo día, mes y año
        },
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Employee is required'],
    },
    reason: {
        type: String,
        
    },
    destiny : {
        type: String,
        
    },
})


export default model('Entry', entrySchema)