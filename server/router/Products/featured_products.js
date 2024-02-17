const express = require('express');
const router = express.Router();
const pool = require('../../db');
const populate_product = require('../../controller/Products/populate_product');

router.get('/:number', async(req, res, next) => {
    try{

        const number = parseInt(req.params.number);
        // console.log(number);
        const sql = `
        WITH product_sell AS(
            WITH max_s AS(
                SELECT
                    product_id,
                    SUM(sold) AS total_sold
                FROM product_attribute
                GROUP BY product_id, attribute_name
            )
            
            SELECT P.id AS id, COALESCE(MAX(total_sold), 0) AS max_total_sold
            FROM product P
            LEFT JOIN max_s AS A ON P.id = A.product_id
            GROUP BY P.id
            )
            
            SELECT * FROM product WHERE id IN(
            SELECT P1.id from product_sell P1
            LEFT JOIN product_sell P2 ON P1.max_total_sold < P2.max_total_sold
            GROUP BY P1.id
            HAVING COUNT(DISTINCT P2.id) < ${number})
        `


        const products = await pool.query(sql);

        // console.log(products);
        const final_products = await populate_product(products);
        
        const jwtToken = req.header("token")
        if(jwtToken){
            await Promise.all(
                final_products.rows.map(async (product) => {
                    const user_id = jwt.verify(jwtToken, process.env.jwtSecret).user;
                    const wishlist_query = await pool.query('SELECT COUNT(*) FROM wishlist WHERE user_id = $1 AND product_id = $2;', [user_id, product.id]);
                    product.wishlist = wishlist_query.rows[0].count > 0 ? true : false;
                    return product;
                }
            ));
        }

        res.json({
            products: final_products.rows,
            top: number,
        })
        next();
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.get('/price/:number', async(req, res, next)=>{
    try{
        //console.log(req);
        // console.log(req.baseUrl)
        const number = parseInt(req.params? req.params.number: 5);
    const sql = `
    SELECT P1.id FROM product P1 
    LEFT JOIN product P2 ON P1.price + (
        SELECT SUM(max_increase) FROM product p
        LEFT JOIN 
        (
        SELECT product_id, MAX(price_increase) AS max_increase FROM product_attribute
        GROUP BY attribute_name, product_id) N
        ON P.id = N.product_id
            WHERE P.id = P1.id
    
    ) < P2.price + (
        SELECT SUM(max_increase) FROM product p
        LEFT JOIN 
        (
        SELECT product_id, MAX(price_increase) AS max_increase FROM product_attribute
        GROUP BY attribute_name, product_id) N
        ON P.id = N.product_id
        WHERE P.id = P2.id
    )
    GROUP BY P1.id
    HAVING COUNT(DISTINCT P2.ID) < ${number}
    `



    const products = await pool.query(
        `
            SELECT * FROM product
            WHERE id IN (${sql})
        `
    );

        await Promise.all(
            products.rows.map(async (product) => {
                product.price = parseFloat(product.price);
                product.previous_price = parseFloat(product.previous_price);
                product.discount = parseFloat(product.discount);
                const specs_query = await pool.query('SELECT * FROM product_attribute WHERE product_id = $1;', [product.id]);
                product.specs = specs_query.rows;
                return product;
            })
        );

        await Promise.all(
            products.rows.map(async (product) => {
                const images_query = await pool.query('SELECT * FROM product_image WHERE product_id = $1;', [product.id]);
                product.images = images_query.rows;
                return product;
            })
        );
        // console.log(products);
        res.json({
            products: products.rows,
            top: number,
        })
        next();
    }
    catch(err){
        console.log(err.message);
    }
    
});

module.exports = router;

