var express = require('express');
var router = express.Router();
const admincontroller = require('../controller/admincontroller')

/* GET home page. */
router.get('/read',admincontroller.SECURE,admincontroller.READ);

router.post('/create',admincontroller.SIGNUP);

router.post('/login',admincontroller.LOGIN);

module.exports = router;
