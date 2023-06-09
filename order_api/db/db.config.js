const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

let _db;

const initDB = (callback) => {
    if (_db) {
        return callback(null, _db);
    }
    mongoose
        .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            console.error(err);
        });
};

const getDB = () => {
    if (!_db) {
        throw Error('Database no initialized');
    }
    return _db;
};

module.exports = {
    initDB,
    getDB
};