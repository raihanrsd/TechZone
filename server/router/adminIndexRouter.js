var express = require('express');
var router = express.Router();

const pool = require('../db');
const authorization = require('../middlewares/authorization');

const adds_prod = require('./Admin/add_products_and_category');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hello duniya!!');
});

router.use('/add', adds_prod.product_add);
router.use('/add', adds_prod.category_add);



module.exports = router;