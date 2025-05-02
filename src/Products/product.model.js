
import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    name : {
        type: String,
        required: [true, 'Name is required'],
    
    },
    category : {
        type: String,
        required: [true, 'Category is required'],
    },
    stock : {
        type: Number,
        required: [true, 'Stock is required'],
    },
    supplier : {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        
    },
    entryDate : {
        type: Date,
        default: Date.now,
    },
    expirationDate : {
        type: Date,
        required: [true, 'Expiration date is required'],
    },
    unitPrice : {
        type: Number,
        required: [true, 'Price is required'],
    },
})
 
export default model('Product', productSchema)