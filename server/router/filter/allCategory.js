const express = require('express');
const router = express.Router();
const pool = require('../../db');
const jwt = require("jsonwebtoken");

const authorization = require('../../middlewares/authorization');

router.get('/', async(req, res, next) => {
    try{
        const sql = 
            `  
                select category_id, category_name 
                from product_category
                where parent_category_id = 81;
            `
        const categories = await pool.query(sql);

        res.json(categories.rows);       
        next();
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;