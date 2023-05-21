const db = require('../models');
const { ObjectId } = require('mongodb');
const user = db.user;

const getAllUsers = async (req, res) => {
    await user.find({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

const getSingleUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    await user.find({ _id: userId })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

const createUser = async (req, res) => {
    const newUser = new user(req.body);
    await newUser
        .save()
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};


module.exports = {
    getAllUsers,
    getSingleUser,
    createUser
};