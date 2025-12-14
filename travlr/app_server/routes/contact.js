var express = require('express');
var router = express.Router();

const ctrlMain = require('../controllers/main');

router.get('/contact', ctrlMain.contact);

module.exports = router;