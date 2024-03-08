

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


router.get('/product_category', authorization, async(req, res, next) => {
    try{
        const admin = await pool.query('SELECT * FROM admin WHERE user_id = $1', [req.user]);
        if(admin.rows.length === 0){
            return res.status(401).send({
                authorized : false,
                message: 'You are not allowed to access this route'
            });
        }
        const product_category = await pool.query('SELECT * FROM get_product_sold_count_by_category();');
        res.json({
            product_category: product_category.rows,
            authorized: true, 
            current_admin : admin.rows[0]
        });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;