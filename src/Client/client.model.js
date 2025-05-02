import { Schema,model } from "mongoose"

const reportSchema = new Schema({
    nombre : {
        type: String,
        required: [true, 'Name is required'],
    },
    contacto : {
        type: String,
        required: [true, 'Contact is required'],
    },

})

export default model('Client', reportSchema)