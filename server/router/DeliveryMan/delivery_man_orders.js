const express = require('express');
const router = express.Router();
const pool = require('../../db');
const authorization = require('../../middlewares/authorization');



router.get('/available_orders', authorization, async(req, res, next) => {
    try{
        
        const sql = `
        SELECT *
        FROM orders
        WHERE order_id IN (
            SELECT order_id FROM orders 
            EXCEPT 
            SELECT order_id FROM order_delivery_man
        ) AND order_status = 'Pending'
        ORDER BY date_added DESC
        ;        
        `

        const orders = await pool.query(sql);

        res.json({
            orders: orders.rows
        })

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


router.post('/accept_order', authorization, async(req, res, next) => {
    try{
        const {order_id} = req.body;
        const user_id = req.user;
        const sql = `
            INSERT INTO order_delivery_man VALUES($1, $2);
        `
        // console.log(order_id, user_id);

        await pool.query(sql, [user_id, order_id]);
        await pool.query('CALL delivery_man_message($1, $2)', [user_id, order_id]);
        res.json({
            message: 'Order accepted successfully',
            accepted: true
        })
    }
    catch(err){
        console.error(err.message);
        res.status(500).send({message: 'Server Error'});
    }
})

router.get('/assigned_orders', authorization, async(req, res, next) => {
    try{
        const user_id = req.user;
        const sql = `
            SELECT * FROM orders WHERE order_id IN (
                SELECT order_id FROM order_delivery_man 
                WHERE user_id = $1
            ) AND order_status = 'Pending';
        `
        const orders = await pool.query(sql, [user_id]);
        res.json({
            orders: orders.rows,
        })
    }catch(err){
        console.error(err.message);
        res.status(500).send({message: 'Server Error'});
    }
})

router.put('/change_payment_status', authorization, async(req, res, next) => {
    try{
        const {order_id} = req.body;
        const user_id = req.user;
        const sql = `
            UPDATE orders SET payment_status = NOT payment_status WHERE order_id = $1;
        `
        await pool.query(sql, [order_id]);
        res.json({
            message: 'Changed Successfully',
            changed: true
        })
    }catch(err){
        console.error(err.message);
        res.status(500).send({message: 'Server Error'});
    }
});


router.get('/completed_orders', authorization, async(req, res, next) => {
    try{
        const user_id = req.user;
        const sql = `
            SELECT * from orders WHERE order_id IN (
                SELECT order_id FROM orders WHERE 
                order_status = 'Delivered' OR order_status = 'Cancelled'
                INTERSECT(
                    SELECT order_id FROM order_delivery_man
                    WHERE user_id = $1
                )
            )
            ORDER BY date_added DESC
        `
        const orders = await pool.query(sql, [user_id]);
        res.json({
            orders: orders.rows,
        })
    }
    catch(err){
        console.error(err.message);
        res.status(500).send({message: 'Server Error'});
    }
})
module.exports = router;