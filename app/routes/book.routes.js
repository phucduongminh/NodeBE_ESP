var express = require('express');
var router = express.Router();

var bookController = require('../controllers/book.controller')


router.get('/book/list',bookController.get_list)

router.get('/book/detail/:id',bookController.detail)

module.exports = router;