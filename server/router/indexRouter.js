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

// filter page routers

router.use('/category', require('./filter/allCategory'));

router.use('/maxPrice', require('./filter/maxPrice'));

router.use('/allFilter', require('./filter/allFilter'));

router.use('/attribute', require('./filter/allAttriubute'));


// others

router.use('/shop', require('./Products/shop_page'));

router.use('/categories', require('./Products/all_categories'));

router.use('/search', require('./Products/Search'));

router.use('/attributes', require('./Products/all_specs'));

router.use('/featured_product', require('./Products/featured_products'));

router.use('/wishlist', require('./Wishlist/wishlist'));

router.use('/products/cart', require('./Cart/Cart'));

router.use('/promo', require('./Orders/promo'));

router.use('/order', require('./Orders/place_order'));

router.use('/shipping_address', require('./Customer/shipping_address'));

router.use('/info', require('./User/user_info'));

router.use('/product', require('./Products/product'));

router.use('/get_order', require('./Orders/order'));

router.use('/tracker', require('./Orders/tracker'));

module.exports = router;