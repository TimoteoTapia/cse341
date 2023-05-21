const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/order', require('./order'));
router.use('/user', require('./user'));

module.exports = router;