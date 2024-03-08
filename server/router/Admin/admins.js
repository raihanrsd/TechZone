const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authorization = require("../../middlewares/authorization");


router.get('/admins', authorization, async(req, res, next) => {
    try{
        const admin = await pool.query('SELECT * FROM admin WHERE user_id = $1', [req.user]);
        if(admin.rows.length === 0){
            return res.status(401).send({
                authorized : false,
                message: 'You are not allowed to access this route'
            });
        }
        const admins = await pool.query('SELECT A.*, G.* FROM admin A LEFT JOIN general_user G ON A.user_id = G.user_id');
        res.json({
            admins: admins.rows,
            authorized: true,
            current_admin : admin.rows[0]
        });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.get('/users', authorization, async(req, res, next) => {
    try{
        const admin = await pool.query('SELECT * FROM admin WHERE user_id = $1', [req.user]);
        if(admin.rows.length === 0){
            return res.status(401).send({
                authorized : false,
                message: 'You are not allowed to access this route'
            });
        }
        const users = await pool.query("SELECT G.*, C.* FROM general_user G LEFT JOIN customer C ON G.user_id = C.user_id WHERE staff_status = 'customer';");
        res.json({
            users: users.rows,
            authorized: true, 
            current_admin : admin.rows[0]
        });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/delivery_man', authorization, async(req, res, next) => {
    try{
        const admin = await pool.query('SELECT * FROM admin WHERE user_id = $1', [req.user]);
        if(admin.rows.length === 0){
            return res.status(401).send({
                authorized : false,
                message: 'You are not allowed to access this route'
            });
        }
        const delivery_man = await pool.query('SELECT G.*, D.* FROM general_user G JOIN delivery_man D ON G.user_id = D.user_id');
        res.json({
            delivery_man: delivery_man.rows,
            authorized: true, 
            current_admin : admin.rows[0]
        })
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.put('/change_admin_rank', authorization, async(req, res, next) => {
    try{
        const { user_id, rank } = req.body;
        const admin = await pool.query('SELECT * FROM admin WHERE user_id = $1', [req.user]);
        if(admin.rows.length === 0){
            return res.status(401).send({
                changed: false,
                message: 'You are not allowed to access this route'
            });
        }
        await pool.query('UPDATE admin SET clearance_level = $1 WHERE user_id = $2', [rank, user_id]);
        res.json({
            changed: true,
            message: 'Admin Rank Changed'
        });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;