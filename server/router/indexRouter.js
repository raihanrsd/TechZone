const express = require('express');
const router = express.Router();
const pool = require('../db');
const authorization = require('../middlewares/authorization');


/* GET users listing. */
router.get('/', authorization, async(req, res, next) => {
  try{
    // pool.query('SELECT * FROM general_user;', (err, result) => {
    //   if(err){
    //     throw err;
    //   }
    //   res.status(200).json(result.rows);
    // });

    const user = await pool.query('SELECT * FROM general_user WHERE user_id = $1', [req.user]);
    res.json(user.rows[0]);
    next();
  }
  catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.use('/shop', require('./Products/shop_page'));

router.use('/categories', require('./Products/all_categories'));

router.use('/search', require('./Products/Search'));

router.use('/attributes', require('./Products/all_specs'));

router.use('/featured_product', require('./Products/featured_products'));

router.use('/wishlist', require('./Wishlist/wishlist'));

router.use('/products/cart', require('./Cart/Cart'));

module.exports = router;