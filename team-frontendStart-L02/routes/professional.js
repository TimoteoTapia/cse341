const express = require('express');

const professionalController = require('../controllers/professional');//withoutdatabse if I want to use just JSON

const router = express.Router();

// GET /feed/posts
router.get('/', professionalController.getData);
// localhost:8080/professional/
module.exports = router;