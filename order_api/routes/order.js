const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order');

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getSingleOrder);
router.post('/', orderController.createOrder);


module.exports = router;