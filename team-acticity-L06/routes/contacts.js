const express = require('express');
const router = express.Router();
// const { body } = require('express-validator');
const { userValidationRules, validateUser } = require('../middleware/index');

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', userValidationRules, validateUser, contactsController.createContact);

router.put('/:id', userValidationRules, validateUser, contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;
