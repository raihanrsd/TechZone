const express = require('express');
const router = express.Router();
const pool = require('../../db');
const jwt = require("jsonwebtoken");
const authorization = require('../../middlewares/authorization');


router.get('/', async(req, res, next) => {
    try{
        const all_products = await pool.query('SELECT *, (SELECT category_name FROM product_category WHERE category_id = PR.category_id ) AS "category_name" FROM product PR ORDER BY PR.id;');
        await Promise.all(
            all_products.rows.map(async (product) => {
                product.price = parseFloat(product.price);
                product.previous_price = parseFloat(product.previous_price);
                product.discount = parseFloat(product.discount);
                const specs_query = await pool.query('SELECT * FROM product_attribute WHERE product_id = $1;', [product.id]);
                product.specs = specs_query.rows;
                return product;
            })
        );

        await Promise.all(
            all_products.rows.map(async (product) => {
                const images_query = await pool.query('SELECT * FROM product_image WHERE product_id = $1;', [product.id]);
                product.images = images_query.rows;
                return product;
            })
        );

        // wishlisting for logged in users
        const jwtToken = req.header("token")
        if(jwtToken){
            await Promise.all(
                all_products.rows.map(async (product) => {
                    const user_id = jwt.verify(jwtToken, process.env.jwtSecret).user;
                    const wishlist_query = await pool.query('SELECT COUNT(*) FROM wishlist WHERE user_id = $1 AND product_id = $2;', [user_id, product.id]);
                    product.wishlist = wishlist_query.rows[0].count > 0 ? true : false;
                    return product;
                }
            ));
        }
        
        
        res.json(all_products.rows);
        next();
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;