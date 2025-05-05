import { Schema,model } from "mongoose";

const notificationSchema = new Schema({
    type : {
        type: String,
        required: [true, 'Type is required'],
    },
    product : {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required'],
    },
    message : {
        type: String,
        required: [true, 'Message is required'],
    },
    date : {
        type: Date,
        default: Date.now,
    },
    status : {
        type: String,
        enum: ['read', 'unread'],
        default: 'unread',
    },
}) 
export default model('Notification', notificationSchema)