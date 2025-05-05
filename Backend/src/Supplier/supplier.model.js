import { Schema, model} from "mongoose"

const supplierSchema = new Schema({
    name : {
        type: String,
        required: [true, 'Name is required'],
    },
    contact : {
        type: String,
        required: [true, 'Contact is required'],
    },
    products : 
    [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
})

export default model('Supplier', supplierSchema)

