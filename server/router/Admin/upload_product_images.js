const express = require("express");
const router = express.Router();
const pool = require("../../db");


const upload_image = router.post("/", async (req, res, next) => {
    try{
        const { product_id, image_urls } = req.body;
        const images = []
        for (const image_url of image_urls) {
            const image = await pool.query("INSERT INTO product_image(product_id, image_url) VALUES($1, $2) RETURNING *;", [
                product_id,
                image_url
            ]);
            images.push(image.rows[0]);
        }

        res.json({
            message: "Images added",
            images: images,
            addStatus: true
        });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

const delete_image = router.delete("/:id", async (req, res, next) => {
    try{
        const image_id = req.params.id;
        await pool.query("DELETE FROM product_image WHERE image_id = $1", [
            image_id
        ]);

        res.json("Image deleted");
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

const get_images = router.get("/:id", async (req, res, next) => {
    try{
        const product_id = req.params.id;
        const images = await pool.query("SELECT * FROM product_image WHERE product_id = $1", [
            product_id
        ]);

        res.json(images.rows);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;