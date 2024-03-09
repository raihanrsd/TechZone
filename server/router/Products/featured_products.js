const express = require('express');
const router = express.Router();
const pool = require('../../db');
const populate_product = require('../../controller/Products/populate_product');

router.get('/:number', async(req, res, next) => {
    try{

        const number = parseInt(req.params.number);
        // console.log(number);
        const sql = `
        WITH RankedProducts AS (
            SELECT
              p.product_id,
              p.product_name,
              pa.attribute_name,
              MAX(pa.attribute_value) AS max_attribute_value,
              ROW_NUMBER() OVER (PARTITION BY p.product_id ORDER BY MAX(pa.attribute_value) DESC) AS rnk
            FROM
              product p
              JOIN order_product op ON p.product_id = op.product_id
              JOIN orders o ON op.order_id = o.order_id
              JOIN product_attributes pa ON p.product_id = pa.product_id
            WHERE
              o.order_status = 'Delivered'
            GROUP BY
              p.product_id, p.product_name, pa.attribute_name
          )
          SELECT
            product_id,
            product_name,
            attribute_name,
            max_attribute_value
          FROM
            RankedProducts
          WHERE
            rnk = 1
          ORDER BY
            max_attribute_value DESC
          LIMIT< ${number};)
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

