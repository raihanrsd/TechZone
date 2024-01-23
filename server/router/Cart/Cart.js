const express = require('express');
const router = express.Router();
const pool = require('../../db');
const populate_base_products = require('../../controller/Products/populate_product');



router.post('/', async (req, res, next) => {
    try{
        const product_id_list = req.body.product_id_list;
        console.log("This is the server side")
        console.log(product_id_list);
        const sql = `
            SELECT * FROM product WHERE id IN (${product_id_list.join(', ')});
        `
        const products = await pool.query(sql);
        const all_products = await populate_base_products(products);
        res.json({
            products: all_products.rows
        });

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;