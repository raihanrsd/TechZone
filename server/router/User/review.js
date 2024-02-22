const express = require('express');
const router = express.Router();
const pool = require('../../db');
const authorization = require('../../middlewares/authorization');



router.post('/',authorization, async (req, res, next) => {
    try{
        const {product_id, review, rating} = req.body;
        const sql = `
        INSERT INTO product_review (user_id, product_id, review, rating) VALUES ($1, $2, $3, $4)
        `;
        await pool.query(sql, [req.user, product_id, review, rating]);
        const reviews = await pool.query('SELECT *, (SELECT username FROM general_user WHERE user_id = PR.user_id) AS username FROM product_review PR WHERE product_id = $1 ORDER BY time_added DESC, rating DESC', [product_id]);
        res.json({
            message: 'Review added successfully', 
            reviews: reviews.rows
        })
    }
    catch(err){
        console.log(err.message);
    }
});

router.get('/:id', async(req, res, next) => {
    try{
        const {id} = req.params;
        const sql = `
        SELECT *, (SELECT username FROM general_user WHERE user_id = PR.user_id) AS username FROM product_review PR WHERE product_id = $1 
        ORDER BY time_added DESC, rating DESC
        `;
        const reviews = await pool.query(sql, [id]);
        res.json(reviews.rows);
    }
    catch(err){
        console.log(err.message);
    }
});

module.exports = router;