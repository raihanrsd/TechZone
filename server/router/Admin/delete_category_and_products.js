const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.delete("/category/:id", async (req, res, next) => {
    try {
        const category_id = req.params.id;
        await pool.query("DELETE FROM product_category WHERE category_id = $1", [
        category_id,
        ]);
        res.json({
            message: "Category deleted",
            deleteStatus: true
        });
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


router.delete("/product/:id", async (req, res, next) => {
    try {
        const product_id = req.params.id;
        await pool.query("DELETE FROM product WHERE id = $1", [
        product_id,
        ]);
        res.json("Product deleted");
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;