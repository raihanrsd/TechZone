const express = require('express');
const router = express.Router();
const pool = require('../../db');
const populate_product = require('../../controller/Products/populate_product');

router.get('/', async(req, res, next) => {
    try{
        const category_id = parseInt(req.query.category_id);
        const searchTerm = req.query.searchTerm;
        
        const sql1 = `
        SELECT DISTINCT C.category_id, A.attribute_name FROM product P 
        LEFT JOIN product_attribute A ON P.id = A.product_id
        RIGHT JOIN product_category C on P.category_id = C.category_id
        WHERE C.category_id = ${category_id};
        `;
        const allCommonSpec = await pool.query(sql1);

        // USING FOR BUDGET PHONE IN EACH CATEGORY
        const sql2 = `
        WITH N AS(
        SELECT P.id FROM product_category C 
        LEFT JOIN product P ON p.category_id = C.category_id 
        WHERE P.price = (
            SELECT MIN(price) FROM product 
            WHERE category_id = P.category_id 
        ) AND C.category_id=${category_id})
        `
        const sql3 = `
        SELECT P.id FROM product P 
        LEFT JOIN product_attribute A 
        ON P.id = A.product_id 
        WHERE LOWER(A._value) LIKE '%${searchTerm}%' 
        OR P.category_id = ${category_id}
        UNION(
            SELECT N.id FROM N
        )
        `

        const products = await pool.query(`
            SELECT * FROM PRODUCT WHERE 
            id IN (
                ${sql2 + sql3}
            )
        `);

        const all_products = await populate_product(products);

        res.json({
            allCommonSpec: allCommonSpec.rows,
            products: all_products.rows
        });


    }
    catch(err){
        console.log(err.message)
        res.status(500).send('Server Error');
    }
});

module.exports = router;