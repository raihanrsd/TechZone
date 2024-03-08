const express = require('express');
const router = express.Router();
const pool = require('../../db');
const authorization = require('../../middlewares/authorization');


router.post('/', async (req, res, next) => {
    try{
        console.log("comes here");
        const promo_name = req.body.promo_name;
        const sql = `
            SELECT * FROM promo WHERE promo_name = $1;
        `
        const promo = await pool.query(sql, [promo_name]);
        if(promo.rows.length === 0){
            return res.json({
                promo: null
            });
        }
        res.json({
            promo: promo.rows[0]
        });
        next();

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/get_promos',authorization, async (req, res, next) => {
    try{
        const admin = await pool.query('SELECT * FROM admin WHERE user_id = $1', [req.user]);
        if(admin.rows.length === 0){
            return res.status(401).send({
                authorized : false,
                message: 'You are not allowed to access this route'
            });
        }
        const promos = await pool.query('SELECT * FROM promo');
        res.json({
            promos: promos.rows
        });
        next();
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;