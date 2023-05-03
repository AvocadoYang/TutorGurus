let express = require('express');
let router = express.Router();
let User = require('../src/models/userModel');
let studentController = require('../src/controller/student');
const jwtFn = require('../src/middleware/auth');

/* GET users listing. */
router.post('/v1/register', studentController.studentSignUp);

router.post('/v1/login', studentController.logIn);





module.exports = router;
