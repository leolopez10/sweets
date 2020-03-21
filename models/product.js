const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;


const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        require: true,
        maxlength: 32
    },
    description: {
        type: String,
        require: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        trim: true,
        require: true,
        maxlength: 32
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    quantity: {
        type: Number
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        required: false,
        type: Boolean
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Product", productSchema);