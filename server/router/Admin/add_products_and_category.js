const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authorization = require("../../middlewares/authorization");

const product_add = router.post("/product", async (req, res, next) => {
    try{
        const {
            product_name,
            price,
            previous_price,
            product_description,
            product_exerpt,
            category_id,
            product_img,
            visibility_status,
            discount_status,
            discount,
            product_status,
            specs
          } = req.body;
        console.log(product_name, price, previous_price, product_description, product_exerpt, category_id, product_img, visibility_status, discount_status, discount, product_status, specs)
        const product = await pool.query("SELECT * FROM product WHERE product_name = $1 AND category_id = $2", [product_name, category_id]);

        if(product.rows.length !== 0){
            return res.status(401).send('Product already exists');
        }

        
        
        const newProduct = await pool.query("INSERT INTO product(product_name, price, previous_price, product_description, product_exerpt, category_id, product_img, visibility_status, discount_status, discount, product_status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 ,$11) RETURNING *;", [
            product_name,
            parseFloat(price),
            parseFloat(previous_price),
            product_description,
            product_exerpt,
            parseInt(category_id),
            product_img,
            Boolean(visibility_status),
            Boolean(discount_status),
            parseFloat(discount),
            product_status
        ]);

        

        const allSpec = [];
        for (const spec of specs) {
            const insert_spec = await pool.query("INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;", [
                newProduct.rows[0].id,
                spec.attribute_name,
                spec._value,
                parseFloat(spec.price_increase),
                parseInt(spec.stock),
                parseInt(spec.sold),
                Boolean(spec.base_spec)
            ]);
            allSpec.push(insert_spec.rows[0]);
        }


        res.json({
            message: 'Product added successfully',
            newProduct: newProduct.rows[0],
            allSpec: allSpec,
            addStatus: true
        });

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  

});

const category_add = router.post("/category", async (req, res, next) => {
  try {
    const {
      category_name,
      category_description,
      category_img,
      visibility_status,
      parent_category_id,
    } = req.body;


    let newCategory = null;
    const category = await pool.query(
      "SELECT * FROM product_category WHERE category_name = $1",
      [category_name]
    );
    if (category.rows.length !== 0) {
      return res.status(401).send("Category already exists");
    }

    console.log(parent_category_id);

    if (parent_category_id === "" || parent_category_id === null) {
      
        newCategory = await pool.query(
        "INSERT INTO product_category(category_name, category_description, category_img, visibility_status) VALUES($1, $2, $3, $4) RETURNING *;",
        [
          category_name,
          category_description,
          category_img,
          Boolean(visibility_status)
        ]
      );
    } else {
      const parent_category = await pool.query(
        "SELECT * FROM product_category WHERE category_id = $1",
        [parent_category_id]
      );
      if (parent_category.rows.length === 0) {
        return res.status(401).send("Parent category does not exists");
      }
      newCategory = await pool.query(
        "INSERT INTO product_category(category_name, category_description, category_img, visibility_status, parent_category_id) VALUES($1, $2, $3, $4, $5) RETURNING *;",
        [
          category_name,
          category_description,
          category_img,
          Boolean(visibility_status),
          parseInt(parent_category_id),
        ]
      );
    }

    res.json({
      message: "Category added successfully",
      newCategory: newCategory.rows[0],
      addStatus: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = { product_add, category_add };
