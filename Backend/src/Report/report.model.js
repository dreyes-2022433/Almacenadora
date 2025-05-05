import { Schema,model } from "mongoose"

const reportSchema = new Schema({
    type: {
        type: String,
        enum: ['entry', 'exit'],
        required: [true, 'Type is required'],
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Employee is required'],
    },
    reason: {
        type: String,
        
    },
    destination : {
        type: String,
        
    },


})
export default model('Report', reportSchema)