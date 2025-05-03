import { Schema,model } from "mongoose"

const reportSchema = new Schema({
    name : {
        type: String,
        required: [true, 'Name is required'],
    },
    contact : {
        type: String,
        required: [true, 'Contact is required'],
    },
    company : {
        type: String,
        required: [true, 'Company is required'],
    },

})

export default model('Client', reportSchema)