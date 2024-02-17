const express = require('express');
const router = express.Router();
const pool = require('../../db');


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

module.exports = router;