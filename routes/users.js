let express = require('express');
let router = express.Router();
let User = require('../src/models/userModel');
let userController = require('../src/controller/user');

/* GET users listing. */
router.post('/register', userController.studentSignUp);

module.exports = router;
