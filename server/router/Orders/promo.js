const express = require('express');
const router = express.Router();
const pool = require('../../db');
const authorization = require('../../middlewares/authorization');


router.post('/', async (req, res, next) => {
    try{
        console.log("comes here");
        const promo_name = req.body.promo_name;
        const sql = `
            SELECT * FROM promo WHERE promo_name = $1
            AND CURRENT_DATE >= promo_start_date AND (promo_end_date >= CURRENT_DATE)
            AND promo_status = 'Active'
            ;
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
            promos: promos.rows,
            authorized: true
        });
        next();
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/add_promo', authorization, async (req, res, next) => {
    try{
        const admin = await pool.query('SELECT * FROM admin WHERE user_id = $1', [req.user]);
        if(admin.rows.length === 0){
            return res.status(401).send({
                added: false,
                message: 'You are not allowed to access this route'
            });
        }
        const { promoName, promoDiscount, promoStatus, promoStartDate, promoEndDate } = req.body;
        const sql = `
            INSERT INTO promo(promo_name, promo_discount, promo_status, promo_start_date, promo_end_date)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *;
        `
        const promo = await pool.query(sql, [promoName, promoDiscount, promoStatus, promoStartDate, promoEndDate]);
        res.json({
            added: true,
            message: 'Promo added successfully',
            promo : promo.rows[0]
        });
        next();
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.delete('/delete_promo',authorization, async (req, res) => {
    try {

        const admin = await pool.query('SELECT * FROM admin WHERE user_id = $1', [req.user]);
        
        if(admin.rows.length === 0){
            return res.status(401).send({
                deleted: false,
                message: 'You are not allowed to access this route'
            });
        }
        
      const { promo_name } = req.body;
  
      // Perform the actual deletion from the database
      await pool.query('DELETE FROM promo WHERE promo_name = $1', [promo_name]);
  
      res.json({ deleted: true, message: 'Promo deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ deleted: false, message: 'Internal Server Error' });
    }
});


router.put('/update_promo', authorization, async (req, res) => {
    try {
        const admin = await pool.query('SELECT * FROM admin WHERE user_id = $1', [req.user]);
        if(admin.rows.length === 0){
            return res.status(401).send({
                updated: false,
                message: 'You are not allowed to access this route'
            });
        }
        const { promoName, promoDiscount, promoStatus, promoStartDate, promoEndDate } = req.body;
        const sql = `
            UPDATE promo
            SET promo_discount = $2, promo_status = $3, promo_start_date = $4, promo_end_date = $5
            WHERE promo_name = $1
            RETURNING *;
        `
        const promo = await pool.query(sql, [promoName, promoDiscount, promoStatus, promoStartDate, promoEndDate]);
        res.json({
            updated: true,
            message: 'Promo updated successfully',
            promo : promo.rows[0]
        });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ updated: false, message: 'Internal Server Error' });
    }
})

module.exports = router;