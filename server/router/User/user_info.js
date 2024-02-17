const express = require('express');
const router = express.Router();
const pool = require('../../db');
const authorization = require('../../middlewares/authorization');


router.get('/user', authorization, async (req, res) => {
    try{

        const id = req.user;
        console.log(id);
        const userQuery = await pool.query('SELECT * FROM general_user WHERE user_id = $1', [id]);

        // Check if any rows were returned
        if (userQuery.rows.length > 0) {
            const user = await userQuery.rows[0];
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/user', authorization, async (req, res) => {
    try{
        const {username, email, contact_no, gender, full_name} = req.body;
        const id = req.user;
        const updateUser = await pool.query(`UPDATE general_user SET username = $1, email = $2, contact_no = $3, gender = $4, full_name = $5 WHERE user_id = $6 RETURNING *;`,
            [username, email, contact_no, gender, full_name, id]);
        
        if(updateUser.rows.length > 0){
            res.json({
                user: updateUser.rows[0],
                uniqueViolation : false
            });
        }
        else{

            res.status(404).json({message: 'User not found'});
        }
    }catch(err){
        if (err.code === '23505') {
            // Assuming email is a unique constraint in this example
            let user;
            try{
                const response = await pool.query('SELECT * FROM general_user WHERE user_id = $1', [req.user]);
                user = response.rows[0];
            }catch(err){
                console.error(err.message);
                res.status(500).send('Server Error');
            }
            res.status(400).json({ message: 'Email, username or contact no already exists. Please choose a different email.',
                uniqueViolation : true,
                user: user
            });
        } else {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
})

router.get('/user/order', authorization, async (req, res) => {
    try{
        const id = req.user;
        const orderQuery = await pool.query('SELECT * FROM orders WHERE user_id = $1', [id]);
        if(orderQuery.rows.length > 0){
            res.json({
                orders: orderQuery.rows,
                orderFound: true
            });
        }
        else{
            res.status(404).json({
                message: 'No orders found',
                orderFound: false
            });
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;