const { body, validationResult } = require('express-validator');

const userValidationRules = [
    body('firstName').notEmpty().withMessage("no found"),
    body('lastName').notEmpty().withMessage("no found last name"),
    body('email').notEmpty().isEmail().withMessage("you need a email"),
    body('favoriteColor').optional(),
    body('birthday').optional(),
];

const validateUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    userValidationRules,
    validateUser,
};