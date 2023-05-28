const mongoose = require('mongoose');
// const passwordComplexity = require('../util/passwordComplexityCheck');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        maxlength: 8,
        // unique: [true, 'This username already exist'],
        required: [true, 'The username field is required.'],
        index: { unique: true, sparse: true }
    },
    password: {
        type: String,
        required: [true, 'The password field is required.']
        // validate: {
        //     validator: passwordComplexity,
        //     message: 'Password complexity requirements not met.'
        // }
    },
    email: {
        type: String,
        required: [true, 'The email field is required.'],
        unique: [true, 'This email already exist'],
        index: true, // Add this line to define a unique index
        validate: {
            validator: function (value) {
                // Regular expression to validate email format
                return /\S+@\S+\.\S+/.test(value);
            },
            message: 'Invalid email format. Check to use @ and . symbol'
        }
    },
    phone: {
        type: Number
    },
    age: {
        type: Number,
        min: 18,
        max: 90
    },
    notification: {
        type: String,
        enum: ['yes', 'no'],
    }
});

const user = mongoose.model('user', userSchema);

module.exports = user;

// \S+ matches one or more non-whitespace characters.
// @ matches the "@" symbol.
// \S+ matches one or more non-whitespace characters again.
// \. matches a dot character.
// \S+ matches one or more non-whitespace characters for the domain part of the email.