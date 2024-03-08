const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authorization = require("../../middlewares/authorization");


router.get('/', authorization, async(req, res, next) => {
    try{
        const admin = await pool.query('SELECT * FROM admin WHERE user_id = $1', [req.user]);
        if(admin.rows.length === 0){
            return res.status(401).send({
                authorized : false,
                message: 'You are not allowed to access this route'
            });
        }
        const orders = await pool.query('SELECT * FROM orders ORDER BY date_added DESC');
        
        for(const order of orders.rows){
            const delivery_man = await pool.query('SELECT G.*, D.* FROM general_user G LEFT JOIN delivery_man D ON G.user_id = D.user_id WHERE G.user_id IN (SELECT DISTINCT user_id FROM order_delivery_man WHERE order_id = $1)', [order.order_id]);
            order.delivery_man = delivery_man.rows? delivery_man.rows[0]: null;
        }

        res.json(orders.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;