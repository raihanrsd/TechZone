const express = require('express');
const router = express.Router();
const pool = require('../../db');
const authorization = require('../../middlewares/authorization');


router.get('/', async(req, res, next) => {
    try{
        const all_products = await pool.query('SELECT *, (SELECT category_name FROM product_category WHERE category_id = PR.category_id ) AS "category_name" FROM product PR;');
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
        res.json(all_products.rows);
        next();
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;