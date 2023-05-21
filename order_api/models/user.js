const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number
    },
    notification: {
        type: String
    },
    membership: {
        type: String
    },
    state: {
        type: String,
        required: true
    }

});

const user = mongoose.model('user', userSchema);

module.exports = user;