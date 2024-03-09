

const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authorization = require("../../middlewares/authorization");


router.get('/product_date', authorization, async(req, res, next) => {
    try{
        const admin = await pool.query('SELECT * FROM admin WHERE user_id = $1', [req.user]);
        if(admin.rows.length === 0){
            return res.status(401).send({
                authorized : false,
                message: 'You are not allowed to access this route'
            });
        }
        const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - 30);

    const product_date = await pool.query(
      'SELECT * FROM get_product_sold_count($1, $2);',
      [startDate.toISOString(), currentDate.toISOString()]
    );
        res.json({
            product_date: product_date.rows,
            authorized: true, 
            current_admin : admin.rows[0]
        });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.get('/order_date', authorization, async(req, res, next) => {
    try{
        const admin = await pool.query('SELECT * FROM admin WHERE user_id = $1', [req.user]);
        if(admin.rows.length === 0){
            return res.status(401).send({
                authorized : false,
                message: 'You are not allowed to access this route'
            });
        }

        const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - 30);
        const order_date = await pool.query(
            'SELECT * FROM get_order_count($1, $2);',
            [startDate.toISOString(), currentDate.toISOString()]
          );
        res.json({
            order_date: order_date.rows,
            authorized: true, 
            current_admin : admin.rows[0]
        });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});




router.get('/price_date', authorization, async(req, res, next) => {
    try{
        const admin = await pool.query('SELECT * FROM admin WHERE user_id = $1', [req.user]);
        if(admin.rows.length === 0){
            return res.status(401).send({
                authorized : false,
                message: 'You are not allowed to access this route'
            });
        }

        const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - 30);
        const order_date = await pool.query(
            'SELECT * FROM get_cumulative_earned_amount($1, $2);',
            [startDate.toISOString(), currentDate.toISOString()]
          );
        res.json({
            price_date: order_date.rows,
            authorized: true, 
            current_admin : admin.rows[0]
        });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.get('/best_selling_products', authorization, async(req, res, next) => {
    try{
        const admin = await pool.query('SELECT * FROM admin WHERE user_id = $1', [req.user]);
        if(admin.rows.length === 0){
            return res.status(401).send({
                authorized : false,
                message: 'You are not allowed to access this route'
            });
        }

        const best_selling = await pool.query(
            `WITH RankedProducts AS (
                SELECT
                  p.id AS product_id,
                  p.product_name,
                  pa.attribute_name,
                  MAX(pa.sold) AS max_sold,
                  ROW_NUMBER() OVER (PARTITION BY p.id ORDER BY MAX(pa.sold) DESC) AS rnk
                FROM
                  product p
                  JOIN product_attribute pa ON p.id = pa.product_id
                GROUP BY
                  p.id, p.product_name, pa.attribute_name
              )
              SELECT
                product_id,
                product_name,
                attribute_name,
                max_sold
              FROM
                RankedProducts
              WHERE
                rnk = 1
              ORDER BY
                max_sold DESC
              LIMIT 10;`
          );

        const product = await pool.query(
            `SELECT * FROM product WHERE id = $1;`,
            [best_selling.rows[0].product_id]
          );

          const specs = await pool.query(
            `SELECT * FROM product_attribute WHERE product_id = $1;`,
            [best_selling.rows[0].product_id]
          );
        const images = await pool.query(
            `SELECT * FROM product_image WHERE product_id = $1;`,
            [best_selling.rows[0].product_id]
          );
          product.rows[0].specs = specs.rows;
        product.rows[0].images = images.rows;
        
        res.json({
            best_selling: best_selling.rows,
            authorized: true, 
            current_admin : admin.rows[0],
            best_product: product.rows[0]
        });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});




router.get('/top_wishlisted_products', authorization, async(req, res, next) => {
    try{
        const admin = await pool.query('SELECT * FROM admin WHERE user_id = $1', [req.user]);
        if(admin.rows.length === 0){
            return res.status(401).send({
                authorized : false,
                message: 'You are not allowed to access this route'
            });
        }

        const best_selling = await pool.query(
            `WITH WishListCounts AS (
                SELECT
                    product_id,
                    COUNT(*) AS wish_count
                FROM
                    wishlist
                GROUP BY
                    product_id
            )
            
            SELECT
                p.id AS product_id,
                p.product_name,
                COALESCE(wc.wish_count, 0) AS wish_count
            FROM
                product p
            LEFT JOIN
                WishListCounts wc ON p.id = wc.product_id
            ORDER BY
                COALESCE(wc.wish_count, 0) DESC
            LIMIT 10;
            `
          );

        const product = await pool.query(
            `SELECT * FROM product WHERE id = $1;`,
            [best_selling.rows[0].product_id]
          );

          const specs = await pool.query(
            `SELECT * FROM product_attribute WHERE product_id = $1;`,
            [best_selling.rows[0].product_id]
          );
        const images = await pool.query(
            `SELECT * FROM product_image WHERE product_id = $1;`,
            [best_selling.rows[0].product_id]
          );
          product.rows[0].specs = specs.rows;
        product.rows[0].images = images.rows;
        
        res.json({
            top_wishlisted: best_selling.rows,
            authorized: true, 
            current_admin : admin.rows[0],
            top: product.rows[0]
        });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})



router.get('/top_rated_products', authorization, async(req, res, next) => {
    try{
        const admin = await pool.query('SELECT * FROM admin WHERE user_id = $1', [req.user]);
        if(admin.rows.length === 0){
            return res.status(401).send({
                authorized : false,
                message: 'You are not allowed to access this route'
            });
        }

        const best_selling = await pool.query(
            `WITH AvgRatings AS (
                SELECT
                    p.id AS product_id,
                    p.product_name,
                    AVG(pr.rating) AS avg_rating
                FROM
                    product p
                LEFT JOIN
                    product_review pr ON p.id = pr.product_id
                GROUP BY
                    p.id, p.product_name
            )
            
            SELECT
                product_id,
                product_name,
                COALESCE(avg_rating, 0) AS avg_rating
            FROM
                AvgRatings
            ORDER BY
                COALESCE(avg_rating, 0) DESC
            LIMIT 10;
            
            `
          );

        const product = await pool.query(
            `SELECT * FROM product WHERE id = $1;`,
            [best_selling.rows[0].product_id]
          );

          const specs = await pool.query(
            `SELECT * FROM product_attribute WHERE product_id = $1;`,
            [best_selling.rows[0].product_id]
          );
        const images = await pool.query(
            `SELECT * FROM product_image WHERE product_id = $1;`,
            [best_selling.rows[0].product_id]
          );
          product.rows[0].specs = specs.rows;
        product.rows[0].images = images.rows;
        
        res.json({
            top_rated: best_selling.rows,
            authorized: true, 
            current_admin : admin.rows[0],
            top: product.rows[0]
        });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})




router.get('/most_valuable_users', authorization, async(req, res, next) => {
    try{
        const admin = await pool.query('SELECT * FROM admin WHERE user_id = $1', [req.user]);
        if(admin.rows.length === 0){
            return res.status(401).send({
                authorized : false,
                message: 'You are not allowed to access this route'
            });
        }

        const users = await pool.query(`
        SELECT
        u.user_id,
        u.username,
        u.email,
        u.full_name,
        SUM(o.total_price) AS cumulative_value
    FROM
        general_user u
    JOIN
        orders o ON u.user_id = o.user_id
    GROUP BY
        u.user_id, u.username, u.email, u.full_name
    ORDER BY
        cumulative_value DESC
    LIMIT 10;
        `);

        res.json({
            most_valuable_users: users.rows,
            authorized: true, 
            current_admin : admin.rows[0],
            most_valuable_user: users.rows[0]
        });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


router.get('/most_active_users', authorization, async(req, res, next) => {
    try{
        const admin = await pool.query('SELECT * FROM admin WHERE user_id = $1', [req.user]);
        if(admin.rows.length === 0){
            return res.status(401).send({
                authorized : false,
                message: 'You are not allowed to access this route'
            });
        }

        const users = await pool.query(`
        SELECT cu.user_id, gu.username, gu.full_name, cu.points
FROM customer cu
JOIN general_user gu ON cu.user_id = gu.user_id
ORDER BY cu.points DESC
LIMIT 10;

        `);

        res.json({
            most_active_users: users.rows,
            authorized: true, 
            current_admin : admin.rows[0],
            most_active_user: users.rows[0]
        });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


router.get('/orders_delivery_man', authorization, async(req, res, next) => {
    try{
        const admin = await pool.query('SELECT * FROM admin WHERE user_id = $1', [req.user]);
        if(admin.rows.length === 0){
            return res.status(401).send({
                authorized : false,
                message: 'You are not allowed to access this route'
            });
        }

        const users = await pool.query(`
        SELECT
    dm.user_id AS delivery_man_id,
    dm.hiring_date,
    COUNT(o.order_id) AS completed_orders_count
FROM
    delivery_man dm
JOIN
    order_delivery_man odm ON dm.user_id = odm.user_id
JOIN
    orders o ON odm.order_id = o.order_id
WHERE
    o.order_status IN ('Delivered', 'Cancelled')
GROUP BY
    dm.user_id, dm.hiring_date;
ORDER BY COUNT(o.order_id) DESC


        `);

        res.json({
            all_delivery_man: users.rows,
            authorized: true, 
            current_admin : admin.rows[0],
            most_skilled : users.rows[0]
        });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;