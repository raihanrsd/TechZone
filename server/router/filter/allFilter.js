const express = require('express');
const router = express.Router();
const pool = require('../../db');
const jwt = require("jsonwebtoken");
const authorization = require('../../middlewares/authorization');

router.get('/', async(req, res, next) => {

    try{
        // console.log('in allFilter.js');
        // console.log(req.query.category);
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const search = req.query.search;

        let sortBy = req.query.sortBy;
        let sortOrder = req.query.sortOrder;

        if(sortBy === 'default'){
            sortBy = 'id';
        }

        const attributeSpecParams = JSON.parse(req.query.attributes);
        // console.log("meow");
        // console.log(attributeSpecParams);
        // console.log("meow");

        
        
        if (typeof req.query.category === 'string' && req.query.category.length > 0) 
        {
            console.log("hello");
            parm = req.query.category.split('&category=');
        }
        else if(req.query.category.length === 0)
        {
            const sql2 = 
            `  
                select category_name 
                from product_category
                where parent_category_id = 1;
            `

            const rows = await pool.query(sql2);
            parm = rows.rows.map(row => row.category_name);
            // console.log(parm);
        }
        else
        {
            parm = req.query.category;
        }

        let placeholders = ''; // Initialize placeholders as an empty string
        if (parm.length > 0) { // Check if parm array has elements
            placeholders = parm.map((_, index) => `$${index + 1}`).join(', ');
        }

        // console.log(placeholders);

        // const sql = 
        //     `  
        //         select *
        //         from(
        //             select pr.*, pc.category_name, pc2.category_name AS "Parent_Category"
        //             from product pr join product_category pc on pr.category_id = pc.category_id
        //                             join product_category pc2 on pc.parent_category_id = pc2.category_id
        //             where pc2.category_name in (${placeholders}) and lower(pr.PRODUCT_NAME) LIKE $${parm.length + 1} 
                
        //             intersect

        //             select pr.*, pc.category_name, pc2.category_name AS "Parent_Category"
        //             from product pr join product_category pc on pr.category_id = pc.category_id
        //                             join product_category pc2 on pc.parent_category_id = pc2.category_id
        //             where pr.price >= ${minPrice} and pr.price <= ${maxPrice}
        //         ) as res
        //         order by ${sortBy} ${sortOrder};
        //     `;    
        //  const result = await pool.query(sql, [...parm, `%${search.toLowerCase()}%`]);
            

        const sql = 
        `  
        select pr.*, pc.category_name, pc2.category_name AS "Parent_Category"
        from product pr join product_category pc on pr.category_id = pc.category_id
                        join product_category pc2 on pc.parent_category_id = pc2.category_id
        where pc2.category_name in (${placeholders}) and lower(pr.PRODUCT_NAME) LIKE $${parm.length + 1} 
        
        intersect

        select pr.*, pc.category_name, pc2.category_name AS "Parent_Category"
        from product pr join product_category pc on pr.category_id = pc.category_id
        join product_category pc2 on pc.parent_category_id = pc2.category_id
        where pr.price >= $${parm.length + 2} and pr.price <= $${parm.length + 3}
        `;    
        
        const attributes = Object.keys(attributeSpecParams).filter(attribute => attributeSpecParams[attribute].length > 0);

        let attrValuesArray = {};
        attributes.forEach((attribute,index) => {attrValuesArray[attribute] = attributeSpecParams[attribute].map(item => item.attrValue)});
        console.log("fucked");
        console.log(attrValuesArray);
        console.log("fucked");

        let paramIndex = parm.length + 4; // Starting index for attribute parameters
        const sqlArray = [];

        attributes.forEach((attribute, index) => {
            // const placeholders2 = attributeSpecParams[attribute].attrValue.map((value, idx) => `$${paramIndex + idx + 1}`).join(',');
            let attrNameHolder = paramIndex;
            let placeholders2 = '';
            placeholders2 = attributeSpecParams[attribute].map((value, idx) => {
                paramIndex += 1;
        
                return `$${paramIndex}`;
            }).join(',');

            const sql2 = 
                `
                select pr.*, pc.category_name, pc2.category_name AS "Parent_Category"
                from product pr join product_category pc on pr.category_id = pc.category_id
                                join product_attribute pa on pa.product_id = pr.id 
                                join product_category pc2 on pc.parent_category_id = pc2.category_id
                where pc2.category_name in (${placeholders}) and pa.attribute_name = $${attrNameHolder} and pa._value in (${placeholders2})
                `;
            sqlArray.push(sql2);
            paramIndex++;
        });

        let finalSql = sql;
        for (let i = 0; i < sqlArray.length; i++) {
            finalSql += ` intersect ${sqlArray[i]}`;
        }

        finalSql = `select * from(` + finalSql + `) as res 
                    order by ${sortBy} ${sortOrder};`;

        // Constructing parameter array
        // const params = [...parm, `%${search.toLowerCase()}%`,minPrice, maxPrice, ...attributes.flatMap(attribute => attrValuesArray[attribute])];
        const params = [...parm, `%${search.toLowerCase()}%`, minPrice, maxPrice];
        
        attributes.forEach(attribute => {
            console.log(`Attribute: ${attribute}`);
            console.log(`attrValuesArray[${attribute}]:`, attrValuesArray[attribute]);

            // const values = attrValuesArray[attribute].map(item => item.attrValue);
            // console.log(values);
            params.push(attribute, ...attrValuesArray[attribute]);
        });
        
        // console.log("meow");
        console.log(params);
        // console.log("meow");
        const result = await pool.query(finalSql, [...params]);


        await Promise.all(
            result.rows.map(async (product) => {
                product.price = parseFloat(product.price);
                product.previous_price = parseFloat(product.previous_price);
                product.discount = parseFloat(product.discount);
                const specs_query = await pool.query('SELECT * FROM product_attribute WHERE product_id = $1;', [product.id]);
                product.specs = specs_query.rows;
                return product;
            })
        );

        await Promise.all(
            result.rows.map(async (product) => {
                const images_query = await pool.query('SELECT * FROM product_image WHERE product_id = $1;', [product.id]);
                product.images = images_query.rows;
                return product;
            })
        );

        // wishlisting for logged in users
        const jwtToken = req.header("token")
        if(jwtToken){
            await Promise.all(
                result.rows.map(async (product) => {
                    const user_id = jwt.verify(jwtToken, process.env.jwtSecret).user;
                    const wishlist_query = await pool.query('SELECT COUNT(*) FROM wishlist WHERE user_id = $1 AND product_id = $2;', [user_id, product.id]);
                    product.wishlist = wishlist_query.rows[0].count > 0 ? true : false;
                    return product;
                }
            ));
        }

        res.json(result.rows);
        next();
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;



// select pr.*, pc.category_name, pc2.category_name AS "Parent_Category"
// 		from product pr join product_category pc on pr.category_id = pc.category_id
// 						join product_attribute pa on pa.product_id = pr.id 
// 						join product_category pc2 on pc.parent_category_id = pc2.category_id
// 		where pc2.category_name in ('Laptop', 'SmartPhone') and pa.attribute_name =  and pa._value in (); 