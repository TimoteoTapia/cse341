const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    shipment: {
        type: String
    },
    color: {
        type: String
    },
    weight: {
        type: String
    },
    discount: {
        type: Number
    }
});

const orders = mongoose.model('order', productSchema);

module.exports = orders;