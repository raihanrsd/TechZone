const express = require('express');
const router = express.Router();
const pool = require('../../db');
const product_populate = require('../../controller/Products/populate_product');
const authorization = require('../../middlewares/authorization');


router.get('/',authorization, async(req, res, next) =>{
    try{

        const sql = `
        SELECT DISTINCT P.* FROM general_user G 
        LEFT JOIN wishlist W ON W.user_id = G.user_id
        LEFT JOIN product P ON P.id = W.product_id
        WHERE G.user_id = '${req.user}'
        `
        console.log(req.user);
        const allWishList = await pool.query(sql);

        const wishList = await product_populate(allWishList);
        //console.log(wishList.rows[0].specs);
        res.json({
            wishlist: wishList.rows,
        })
    }
    catch(err){
        console.log(err.message);
    }
});

router.get('/top/:number', async(req, res, next) => {
    try{

        const number = parseInt(req.params.number);
        // console.log(number);
        const sql = `
        SELECT * FROM product WHERE 
        id IN (
        WITH N AS (
        SELECT P.id, COUNT(G.user_id) AS MAX_COUNT FROM general_user G 
        JOIN wishlist W ON W.user_id = G.user_id
        JOIN product P ON P.id = W.product_id
        GROUP BY P.id)


            SELECT N1.id FROM N N1
            LEFT JOIN N M ON N1.MAX_COUNT < M.MAX_COUNT
            GROUP BY N1.id
                HAVING COUNT(M.id) < ${number})
            `

        const products = await pool.query(sql);

        const allProducts = await product_populate(products);

        res.json({
            wishlist: allProducts.rows,
            top: number,
        });
        next();
        }
        catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
});


module.exports = router;


