const express = require('express');
const router = express.Router();
const pool = require('../../db');
const authorization = require('../../middlewares/authorization');


router.post('/',authorization, async (req, res, next) => {
    try{
        const {
            payment_method,
            delivery_charge,
            total_price,
            promo_name,
            discount_amount,
            _address,
            city,
            shipping_state,
            zip_code,
            country,
            product_map,
            cart
        } = req.body;
        let address_id = req.body.address_id;
        //console.log(address_id, "address_id")
        const user_id = req.user;
        // console.log(payment_method, delivery_charge, total_price, promo_name, discount_amount, _address, city, shipping_state, zip_code, country, address_id, user_id);
        if(address_id === -1 || address_id === '-1'){

            const sql = `
                INSERT INTO shipping_address (user_id, _address, city, shipping_state, zip_code, country)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *;
            `
            const address = await pool.query(sql, [user_id, _address, city, shipping_state, zip_code, country]);
            address_id = address.rows[0].address_id;
        }
        
        const orderProducts = [];


        for (const productId in product_map) {
            const product = product_map[productId];

            // console.log(product.price);

            // Check if the product has specs
            for(const info of cart[productId]){
                // console.log(info);
                // console.log(info);
                //console.log(specs, quantity);
                let spec_description = '';
                let price = product.price;
                for(const spec of info.specs){
                    if(spec.stock < info.quantity){
                        return res.status(400).json({
                            message: "Not enough stock"
                        });
                    }
                    spec_description += `${spec._value} `;
                    price+= parseFloat(spec.price_increase);
                    const sql = ` 
                        UPDATE product_attribute SET stock = stock - $1, sold = sold + $1 WHERE id = $2;
                    `
                    await pool.query(sql, [info.quantity, spec.id]);
                }

                orderProducts.push({
                    product_id : productId,
                    quantity : info.quantity,
                    price : price,
                    spec_description : spec_description
                });
            }
        }

        // Store orderProducts in the database (replace with your database logic)
        // console.log(orderProducts);
        const sql = `
            INSERT INTO orders(user_id, payment_method, promo_name, discount_amount, delivery_charge, total_price, _address, city, shipping_state, zip_code, country)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *;
        `

        const response = await pool.query(sql, [user_id, payment_method, promo_name, parseFloat(discount_amount), parseFloat(delivery_charge), parseFloat(total_price), _address, city, shipping_state, zip_code, country]);
        // console.log("comes here");
        const order = await response.rows[0];
        const products = []
        //console.log("shomossha eikhaner bhitore")
        for(const order_product of orderProducts){
            const sql = `
                INSERT INTO order_product(order_id, product_id, quantity, spec_description, price)
                VALUES ($1, $2, $3, $4, $5) RETURNING *;
            `
            // console.log(order.order_id, parseInt(order_product.product_id), parseInt(order_product.quantity), order_product.spec_description, parseFloat(order_product.price));
            const response = await pool.query(sql, [order.order_id, parseInt(order_product.product_id), parseInt(order_product.quantity), order_product.spec_description, parseFloat(order_product.price)]);
            products.push(response.rows[0]);
        }
        // console.log("eikhane ashar kothana")
        res.json({
            order: order,
            products
        });

        next();

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;