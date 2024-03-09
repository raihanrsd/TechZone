const express = require('express');
const router = express.Router();
const pool = require('../../db');
const authorization = require('../../middlewares/authorization');
const jwt = require("jsonwebtoken");


router.get('/:id', async(req, res, next) => {
    try{
        console.log(req.params.id);
        const product = await pool.query('SELECT *, (SELECT category_name FROM product_category WHERE category_id = PR.category_id ) AS "category_name", (SELECT category_img from product_category where category_id = PR.category_id) as "category_img" FROM product PR WHERE id = $1;', [req.params.id]);
        if(product.rows.length === 0){
            return res.json({
                product: null,
                done: false
            });
        }

        const specs = [];
        const images = [];
        const specs_query = await pool.query('SELECT * FROM product_attribute WHERE product_id = $1;', [req.params.id]);
        specs_query.rows.forEach(spec => {
            specs.push(spec);
            
        });
        const images_query = await pool.query('SELECT * FROM product_image WHERE product_id = $1;', [req.params.id]);
        images_query.rows.forEach(image => {
            images.push(image);
        });
        console.log(product.rows[0]);
        product.rows[0].specs = specs;
        product.rows[0].images = images;

        // if(req.header('token')){
        //     const user_id = jwt.verify(req.header('token'), process.env.jwtSecret).user;
        //     const wishlist_query = await pool.query('SELECT COUNT(*) FROM wishlist WHERE user_id = $1 AND product_id = $2;', [user_id, req.params.id]);
        //     product.rows[0].wishlist = wishlist_query.rows[0].count > 0 ? true : false;
        // }

        if(req.header('token')){
            console.log('comes here');
            const user_id = jwt.verify(req.header('token'), process.env.jwtSecret).user;
            const wishlist_query = await pool.query('SELECT COUNT(*) FROM wishlist WHERE user_id = $1 AND product_id = $2;', [user_id, req.params.id]);
            product.rows[0].wishlist = wishlist_query.rows[0].count > 0 ? true : false;
        }
        res.json({
            product: product.rows[0],
            done: true
        });
        next();
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;