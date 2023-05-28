const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    product: {
        type: String,
        required: [true, 'The product field is required.']
    },
    price: {
        type: Number,
        required: [true, 'The price field is required.']
    },
    quantity: {
        type: Number,
        required: [true, 'The quantity field is required.']
    },
    shippingMethod: {
        type: String,
        enum: ['express', 'pickup'],
        required: [true, 'The shipping method field is required.']
    },
    color: {
        type: String
    },
    additionalNotes: {
        type: String
    },
    discount: {
        type: Number
    },
    // Other fields...
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// Pre-save middleware
productSchema.pre('save', function (next) {
    if (this.isNew) {
        this.created_at = Date.now();
    }
    this.updated_at = Date.now();
    next();

});

const orders = mongoose.model('order', productSchema);

module.exports = orders;