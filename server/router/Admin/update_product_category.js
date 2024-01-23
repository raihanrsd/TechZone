const express = require("express");
const router = express.Router();
const pool = require("../../db");


router.put(`/product/:id`, async (req, res, next) => {
    try {
        console.log("comes here");
        const product_id = req.params.id;
        const { product_name, price, previous_price, discount, category_id, product_description, product_exerpt, visibility_status, discount_status, product_status, specs } = req.body;
        const update_product = await pool.query("UPDATE product SET product_name = $1, price = $2, previous_price = $3, discount = $4, category_id = $5, product_description = $6, product_exerpt = $7, visibility_status = $8, discount_status = $9, product_status = $10 WHERE id = $11 RETURNING *;", [
            product_name,
            parseFloat(price),
            parseFloat(previous_price),
            parseFloat(discount),
            parseInt(category_id),
            product_description,
            product_exerpt,
            Boolean(visibility_status),
            Boolean(discount_status),
            Boolean(product_status),
            product_id
        ]);


        console.log("product update done");
        console.log(specs);
        const allSpec = [];
        for (const spec of specs) {
            if (spec.new_info === false) {
                const update_spec = await pool.query("UPDATE product_attribute SET attribute_name = $1, _value = $2, price_increase = $3, stock = $4, sold = $5, base_spec = $6 WHERE id = $7  RETURNING *;", [
                    spec.attribute_name,
                    spec._value,
                    parseFloat(spec.price_increase),
                    parseInt(spec.stock),
                    parseInt(spec.sold),
                    Boolean(spec.base_spec),
                    spec.id
                ]);
                allSpec.push(update_spec.rows[0]);
            } else {
                const insert_spec = await pool.query("INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;", [
                    product_id,
                    spec.attribute_name,
                    spec._value,
                    parseFloat(spec.price_increase),
                    parseInt(spec.stock),
                    parseInt(spec.sold),
                    Boolean(spec.base_spec)
                ]);
                allSpec.push(insert_spec.rows[0]);
            }
        }

        res.json({
            message: "Product updated",
            updateStatus: true,
            product: update_product.rows[0],
            specs: allSpec
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



module.exports = router;

