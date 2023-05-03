let express = require('express');
let router = express.Router();
let User = require('../src/models/userModel');
let tutorController = require('../src/controller/tutor');

/* GET users listing. */
router.post('/v1/register', tutorController.teacherSignUp);

router.post('/v1/login', tutorController.logIn);

module.exports = router;
