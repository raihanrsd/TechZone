const express = require('express');
const router = express.Router();
const pool = require('../../db');


router.get('/', async(req, res, next) => {
    try{
        const all_specs = await pool.query('SELECT DISTINCT attribute_name FROM product_attribute;');
        // console.log(all_specs.rows);
        res.json(all_specs.rows);
        
        next();
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;
