const express = require('express');
const pool = require('../../db');

const populate_base_products = async (products) =>{
    await Promise.all(
        products.rows.map(async (product) => {
            product.price = parseFloat(product.price);
            product.previous_price = parseFloat(product.previous_price);
            product.discount = parseFloat(product.discount);
            const specs_query = await pool.query('SELECT * FROM product_attribute WHERE product_id = $1;', [product.id]);
            const product_specs = specs_query.rows;
            const base_specs = product_specs.filter(spec => spec.base_spec === true);
            product.specs = base_specs;
            return product;
        })
    );

    await Promise.all(
        products.rows.map(async (product) => {
            const images_query = await pool.query('SELECT * FROM product_image WHERE product_id = $1;', [product.id]);
            product.images = images_query.rows;
            return product;
        })
    );

    return products;
}

module.exports = populate_base_products;