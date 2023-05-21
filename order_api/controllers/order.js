const db = require('../models');
const { ObjectId } = require('mongodb');
const order = db.order;

const getAllOrders = async (req, res) => {
    await order.find({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

const getSingleOrder = async (req, res) => {
    const OrderID = new ObjectId(req.params.id);
    await order.find({ _id: OrderID })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

const createOrder = async (req, res) => {
    const newOrder = new order(req.body);
    await newOrder
        .save()
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

module.exports = {
    getAllOrders,
    getSingleOrder,
    createOrder
};