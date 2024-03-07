const express = require('express');
const router = express.Router();
const pool = require('../../db');
const authorization = require('../../middlewares/authorization');


router.get('/',authorization, async(req, res, next) => {
    try{
        const delivery_man_id = req.user;
        const sql = `
            SELECT * FROM delivery_man WHERE user_id = $1;
        `;
        
        
        const deliveryMan = await pool.query(sql, [delivery_man_id]);
        
        if(deliveryMan.rows.length === 0){
            return res.json({
                verified: false
            });
        }

        const info = await pool.query('SELECT * FROM general_user WHERE user_id = $1', [delivery_man_id]);

        res.json({
            verified: true,
            delivery_man : deliveryMan.rows[0],
            info: info.rows[0]
        });

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;