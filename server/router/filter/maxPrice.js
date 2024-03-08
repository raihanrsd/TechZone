const express = require('express');
const router = express.Router();
const pool = require('../../db');
const jwt = require("jsonwebtoken");
const authorization = require('../../middlewares/authorization');

router.get('/', async(req, res, next) => {
    try{
        const sql = 
            `  
                select max(price)
                from product;
            `
        const maxPrice = await pool.query(sql);

        res.json(maxPrice.rows[0].max);
        next();
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;