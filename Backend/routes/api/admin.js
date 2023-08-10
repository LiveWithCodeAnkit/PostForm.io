var express = require('express');
var router = express.Router();

const userCtrl = require("../../controllers/user.controller")

router.get('/users', userCtrl.findAll);

router.put('/user/:id', userCtrl.updateById);

module.exports = router;
