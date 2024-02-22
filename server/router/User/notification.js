const express = require('express');
const router = express.Router();
const pool = require('../../db');
const authorization = require('../../middlewares/authorization');


router.get('/',authorization, async(req, res, next) =>{
    try{
        const sql = `
            SELECT * FROM notification WHERE user_id = '${req.user}' ORDER BY time_added DESC
        `

        const allNotifications = await pool.query(sql);
        const hasUnread = await pool.query(`SELECT * FROM notification WHERE user_id = '${req.user}' AND seen_status = false`);
        const unread = hasUnread ? hasUnread.rows.length : 0;

        res.json({
            notifications: allNotifications.rows,
            unread: hasUnread.rows.length,
        })

    }
    catch(err){
        console.log(err.message);
    }
})

router.put('/seen',authorization, async(req, res, next) =>{
    try{
        const sql = `
            UPDATE notification SET seen_status = true WHERE user_id = '${req.user}'
        `
        
        await pool.query(sql);
        const notifications = await pool.query(`SELECT * FROM notification WHERE user_id = '${req.user}' ORDER BY time_added DESC`);
        res.json({
            message: "All notifications marked as read",
            notifications: notifications.rows,
            unread: 0,
        })

    }
    catch(err){
        console.log(err.message);
    }
})

module.exports = router;