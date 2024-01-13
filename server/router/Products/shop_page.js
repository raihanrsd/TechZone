const express = require('express');
const router = express.Router();
const pool = require('../db');
const authorization = require('../middlewares/authorization');


router.get('/', authorization, async(req, res, next) => {
    try{
        const all_products = await pool.query('SELECT * FROM product;');
        res.json(all_products.rows);
        next();
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})