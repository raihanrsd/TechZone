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
            const current_user = await pool.query('SELECT * FROM general_user WHERE user_id = $1', [req.user]);
            if(user.rows[0].user_id != req.user && current_user.rows[0].staff_status !== 'admin'){
                console.log('this is user', user.rows[0]);
                console.log('this is staff status',user.rows[0].staff_status);
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
                current_user : current_user.rows[0],
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


router.post('/', authorization, async (req, res, next) => {
    try{
        const {tracker_id, progress} = req.body;
        const sql1 = `
            SELECT * FROM tracker WHERE tracker_id = $1
        `;
        const response1 = await pool.query(sql1, [tracker_id]);
        const tracker = response1.rows[0];
        
        const response2  = await pool.query('SELECT * FROM general_user WHERE user_id = $1', [req.user]);
        const user = response2.rows[0];
        if(user.staff_status !== 'admin'){
            return res.status(401).json({
                message: 'You are not authorized to update this tracker',
                isAuthorized: false
            });
        }

        const sql = `
            UPDATE tracker SET progress = $1 WHERE tracker_id = $2 RETURNING *;
        `;

        const response = await pool.query(sql, [progress, tracker_id]);
        res.json({
            tracker: response.rows[0],
            message: 'Tracker Updated',
            isAuthorized: true
        });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.put('/', authorization, async (req, res, next) => {
    try{
        
        const {id, estimated_delivery_date} = req.body;
        
        
        const response2  = await pool.query('SELECT * FROM general_user WHERE user_id = $1', [req.user]);
        const user = response2.rows[0];
        if(user.staff_status !== 'admin' && user.staff_status !== 'delivery_man'){
            return res.status(401).json({
                message: 'You are not authorized to update this tracker',
                isAuthorized: false
            });
        }

        const sql = `
            UPDATE tracker SET estimated_delivery_date = $1 WHERE tracker_id = $2 RETURNING *;
        `;

        const response = await pool.query(sql, [estimated_delivery_date, id]);
        res.json({
            tracker: response.rows[0],
            message: 'Tracker Updated',
            isAuthorized: true
        });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;

