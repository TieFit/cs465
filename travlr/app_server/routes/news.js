var express = require('express');
var router = express.Router();

const ctrlMain = require('../controllers/main');

router.get('/news', ctrlMain.news);

module.exports = router;