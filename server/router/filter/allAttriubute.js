const express = require('express');
const router = express.Router();
const pool = require('../../db');
const jwt = require("jsonwebtoken");

const authorization = require('../../middlewares/authorization');

router.get('/', async(req, res, next) => {
    console.log("we are in attributes api");
    try{
        const sql = `  
            select distinct pa.attribute_name, pa._value , (select pc2.category_name 
                                                            from product_category pc2
                                                            where pc2.category_id = pc.parent_category_id
               )
                from product_attribute pa join product p on pa.product_id = p.id
                                          join product_category pc on p.category_id = pc.category_id
                order by attribute_name, _value; 
            `;
        const attributes = await pool.query(sql);
        // console.log(attributes.rows);

        res.json(attributes.rows);       
        next();
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;