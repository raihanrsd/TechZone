const express = require('express');
const router = express.Router();
const pool = require('../../db');
const authorization = require('../../middlewares/authorization');


router.get('/:id', authorization, async (req, res) => {
    try{
        const id = req.params.id; // this is the tracker id
        const response = await pool.query('SELECT * FROM tracker WHERE tracker_id = $1', [id]);
        if(response.rows.length > 0){
            const sql = `
            SELECT * FROM general_user WHERE user_id = (

                SELECT user_id from ORDERS WHERE order_id = (
                    SELECT order_id FROM tracker WHERE tracker_id = ${id}
            ))
            `;

            const user = await pool.query(sql);
            if(user.rows[0].user_id != req.user && user.rows[0].staff_status !== 'admin'){
                return res.status(401).json({
                    message: 'You are not authorized to view this tracker',
                    isAuthorized: false
                });
            }

            const order = await pool.query('SELECT * FROM orders WHERE order_id = $1', [response.rows[0].order_id]);
            res.json({
                tracker: response.rows[0],
                user: user.rows[0],
                message: 'Tracker Found',
                isAuthorized: true,
                order: order.rows[0]
            });
        }
        else{
            res.status(404).json({
                message: 'Tracker not found',
                isAuthorized: false
            });
        }
        
    }catch(err){
        console.error(err.message);
        res.status(500).json({message: 'Server Error'});
    }
});


module.exports = router;

