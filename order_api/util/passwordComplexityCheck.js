const passwordComplexity = require('joi-password-complexity');

// Define password complexity options
const complexityOptions = {
    min: 8,  // Minimum password length
    max: 30, // Maximum password length
    lowerCase: 1, // Require at least 1 lowercase letter
    upperCase: 1, // Require at least 1 uppercase letter
    numeric: 1, // Require at least 1 numeric character
    symbol: 1, // Require at least 1 special character
    requirementCount: 4, // Total number of complexity requirements
};

// const passwordValidator = passwordComplexity(complexityOptions);
// function validatePassword(password) {
//     const validationResult = passwordValidator.validate(password);
//     if (validationResult.error) {
//         // Handle the validation error
//         console.error(validationResult.error);
//         return false;
//     }
//     return true;
// }

// module.exports = validatePassword;

module.exports.passwordPass = (passwordToCheck) => {
    return passwordComplexity(complexityOptions, 'Password').validate(passwordToCheck);
};
//-- A second option