const express = require('express');
const router = express.Router();
const pool = require('../../db');
const authorization = require('../../middlewares/authorization');

router.get('/',authorization, async(req, res, next) => {
    try{
        const addresses = await pool.query('SELECT * FROM shipping_address WHERE user_id = $1;', [req.user]);
        if(addresses.rows.length === 0){
            return res.json({
                addresses: null
            });
        }
        res.json({
            addresses: addresses.rows
        });
        next();
        
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/:id', authorization, async(req, res, next) => {
    try{
        const {id} = req.params;
        const {_address, city, shipping_state, country, zip_code} = req.body;
        const sql = `UPDATE shipping_address SET _address = $1, city = $2, shipping_state = $3, country = $4, zip_code = $5 WHERE address_id = $6 AND user_id = $7 RETURNING *`;
        const values = [_address, city, shipping_state, country, zip_code, id, req.user];
        const updatedAddress = await pool.query(sql, values);
        if(updatedAddress.rows.length === 0){
            const response = await pool.query('SELECT * FROM shipping_address WHERE address_id = $1', [id]);
            return res.status(404).json({
                message: 'Address not found', 
                address: response.rows[0],
                done: false
            });
        }
        res.json({
            address: updatedAddress.rows[0],
            done: true
        });
        next();
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.delete('/:id', authorization, async(req, res, next) => {
    try{
        const {id} = req.params;
        const sql = `DELETE FROM shipping_address WHERE address_id = $1 AND user_id = $2 RETURNING *`;
        const values = [id, req.user];
        const deletedAddress = await pool.query(sql, values);
        if(deletedAddress.rows.length === 0){
            return res.status(404).json({
                message: 'Address not found',
                done: false
            });
        }
        res.json({
            address: deletedAddress.rows[0],
            done: true
        });
        next();
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', authorization, async(req, res, next) => {
    try{
        const {_address, city, shipping_state, country, zip_code} = req.body;
        const sql = `INSERT INTO shipping_address (_address, city, shipping_state, country, zip_code, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [_address, city, shipping_state, country, zip_code, req.user];
        console.log(values);
        const newAddress = await pool.query(sql, values);

        if(newAddress.rows.length === 0){
            return res.status(404).json({
                message: 'Address not found',
                done: false
            });
        }
        res.json({
            address: newAddress.rows[0],
            done: true
        });
        next();
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;