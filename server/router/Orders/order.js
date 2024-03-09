const express = require('express');
const router = express.Router();
const pool = require('../../db');
const authorization = require('../../middlewares/authorization');


router.get('/:id', authorization, async (req, res) => {
    try{
        const id = req.params.id;
        let user = await pool.query('SELECT * FROM general_user WHERE user_id = $1', [req.user]);
        
        const order = await pool.query('SELECT * FROM orders WHERE order_id = $1', [id]);
        
        console.log(order.rows[0].user_id, req.user, user.rows[0].staff_status, 'user');
        if(order.rows[0].user_id !== req.user && user.rows[0].staff_status !== 'admin' && user.rows[0].staff_status !== 'delivery_man'){
            return res.status(401).json({
                message: 'You are not authorized to view this order',
                isAuthorized: false
            });
        }

        if(user.rows[0].staff_status === 'delivery_man'){
            const is_assigned_order = await pool.query(`
                    SELECT * FROM order_delivery_man WHERE order_id = $1 AND user_id = $2
                `, [id, req.user]);

                // console.log('assigned order ', is_assigned_order.rows, req.user, id);
                if(is_assigned_order.rows.length === 0){
                    return res.status(401).json({
                        message: 'You are not authorized to view this order',
                        isAuthorized: false
                    });
                }
        }
        if(order.rows.length > 0){
            const product_info = await pool.query('SELECT * FROM order_product WHERE order_id = $1', [id]);
            await Promise.all(
                product_info.rows.map(async (product) => {
                    const product_query = await pool.query('SELECT * FROM product WHERE id = $1', [product.product_id]);
                    product.product = product_query.rows[0];
                    const images = await pool.query('SELECT * FROM product_image WHERE product_id = $1', [product.product_id]);
                    product.product.images = images.rows;
                    return product;
                })
            )

            
            const tracker = await pool.query('SELECT * FROM tracker WHERE order_id = $1', [id]);
            const current_user = user;
            user = await pool.query('SELECT * FROM general_user WHERE user_id = $1', [order.rows[0].user_id]);
            
            const assigned_user = await pool.query(`SELECT * FROM general_user WHERE user_id = (
                SELECT user_id FROM order_delivery_man WHERE order_id = $1
            )`, [id]);


            res.json({
                order: order.rows[0],
                product_info: product_info.rows,
                user: user? user.rows[0]: null,
                tracker: tracker? tracker.rows[0]: null,
                message: 'Order Found',
                isAuthorized: true,
                assigned_user: assigned_user.rows[0] ? assigned_user.rows[0]: null,
                current_user: current_user.rows[0]
            });
        }
        else{
            res.status(404).json({
                message: 'Order not found', 
                isAuthorized: false
            });
        }
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.put('/cancel_order/:id', authorization, async(req, res) => {
    try{
        const id = req.params.id;
        const user = await pool.query('SELECT * FROM general_user WHERE user_id = $1', [req.user]);
        const order = await pool.query('SELECT * FROM orders WHERE order_id = $1', [id]);
        const body = req.body;
        if(order.rows[0].user_id !== req.user && user.rows[0].staff_status !== 'admin')
        {
            return res.status(401).json({
                message: 'You are not authorized to cancel this order',
                isAuthorized: false
            });
        }
        const sql = `
            UPDATE orders SET order_status = 'Cancelled', reason_for_cancellation = $2  WHERE order_id = $1;
        `;

        await pool.query(sql, [id, JSON.stringify(body)]);


        res.json({
            message: 'Order Cancelled',
            isAuthorized: true
        });

    }
    catch(err){
        console.error(err.message);
        res.status(500).send({ message: 'Server Error'});
    }
})

module.exports = router;
