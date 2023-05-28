const db = require('../models');
const user = db.user;
const passwordUtil = require('../util/passwordComplexityCheck'); //option 2 to use password validation

const getAllUsers = (req, res) => {
    try {
        user.find({})
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving users.'
                });
            });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSingleUser = (req, res) => {
    try {
        // const userId = new ObjectId(req.params.id);
        const username = req.params.username; //This is another way to get the value 
        user.find({ username: username })
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

const createUser = (req, res) => {
    try {
        if (!req.body.username || !req.body.password || !req.body.email) {
            res.status(400).send({ message: 'Content can not be empty!' });
            return;
        }
        // const newUser = new user({ // test
        //     username: "test",
        //     password: "MySecurePwd2023@", // Replace with a password that doesn't meet the complexity requirements
        //     email: "test2@gmail.com",
        //     phone: 5545213625,
        //     age: 25,
        //     notification: "yes",
        // });
        // return newUser.save()//test
        //     .then(() => {
        //         console.log('User created successfully');
        //     })
        //     .catch((error) => {
        //         console.error('Error creating user:', error);
        //     });

        const password = req.body.password; // this is another option to use pasword validation
        const passwordCheck = passwordUtil.passwordPass(password);
        if (passwordCheck.error) {
            res.status(400).send({ message: passwordCheck.error });
            return;
        } // I should add it to put method too, is better add it to the schema
        const newUser = new user(req.body);
        newUser
            .save()
            .then((data) => {
                res.status(201).send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while creating the user.'
                });
            });
    } catch (err) {
        res.setHeader('Content-Type', 'text/html');
        res.status(500).send('<h1>Error</h1><p>' + err.message + '</p>');
        // res.status(500).json(err);
    }
};

const updateUser = async (req, res) => {
    try {
        const username = req.params.username;
        if (!username) {
            return res.status(400).send({ message: 'Invalid Username Supplied' });
        }

        const { password, email, phone, age, notification } = req.body;
        const passwordCheck = passwordUtil.passwordPass(password);
        if (passwordCheck.error) {
            return res.status(400).send({ message: passwordCheck.error });
        }

        const updatedUser = await user.findOneAndUpdate(
            { username: username },
            { $set: { password, email, phone, age, notification } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.status(200).send({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        return res.status(500).json(err);
    }
};

const deleteUser = async (req, res) => {
    try {
        const username = req.params.username;
        if (!username) {
            res.status(400).send({ message: 'Invalid Username Supplied' });
            return;
        }
        const result = await user.deleteOne({ username: username });
        if (result.deletedCount === 0) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(500).send({ message: 'Some error occurred while deleting the contact.' });
    }
};


module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
};