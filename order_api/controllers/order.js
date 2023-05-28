const db = require('../models');
const { ObjectId } = require('mongodb');
const order = db.order;


const getAllOrders = (req, res) => {
    try {
        order.find({})
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSingleOrder = (req, res) => {
    try {
        const OrderID = new ObjectId(req.params.id);
        order.find({ _id: OrderID })
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((err) => {
                res.status(500).send(err);
            });

    } catch (err) {
        res.status(500).json(err);
    }
};



const createOrder = (req, res) => {
    try {
        if (!req.body.product || !req.body.price || !req.body.quantity || !req.body.shippingMethod) {
            res.status(400).send({ message: 'Content can not be empty!' });
            return;
        }
        const newOrder = new order(req.body);
        newOrder
            .save()
            .then((data) => {
                res.status(201).send(data);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    } catch (err) {
        res.setHeader('Content-Type', 'text/html');
        res.status(500).send('<h1>Error</h1><p>' + err.message + '</p>');
        // res.status(500).json(err);
    }
};

const updateOrder = (req, res) => {
    try {
        const OrderID = new ObjectId(req.params.id);
        if (!OrderID) {
            res.status(400).send({ message: 'Invalid Username Supplied' });
            return;
        }
        const updateOrder = {
            product: req.body.product,
            price: req.body.price,
            shippingMethod: req.body.shippingMethod,
            color: req.body.color,
            additionalNotes: req.body.additionalNotes,
            discount: req.body.discount,
            updated_at: Date.now()
        };
        order.findByIdAndUpdate({ _id: OrderID }, { $set: updateOrder }, { new: true })
            .then((data) => {
                if (!data) {
                    throw new Error('Product not found!');
                }
                res.status(200).send({ message: 'User updated successfully', user: updateOrder });
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while updating the product.'
                });
            });
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteOrder = (req, res) => {
    try {
        const OrderID = new ObjectId(req.params.id);
        if (!OrderID) {
            res.status(400).send({ message: 'Invalid Username Supplied' });
            return;
        }
        order.deleteOne({ _id: OrderID })
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    } catch (err) {
        res.status(500).json(err || 'Some error occurred while deleting the contact.');
    }
};

module.exports = {
    getAllOrders,
    getSingleOrder,
    createOrder,
    updateOrder,
    deleteOrder
};