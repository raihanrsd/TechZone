const express = require('express');
const router = express.Router();
const pool = require('../../db');

router.get('/', async(req, res, next) => {
    try{
        const all_categories = await pool.query('SELECT * FROM product_category;');
        res.json(all_categories.rows);
        next();
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;