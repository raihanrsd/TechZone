const express = require('express');
const router = express.Router();
const pool = require('../../db');
const authorization = require('../../middlewares/authorization');

router.get('/get_users', authorization, async(req, res, next) => {
    try{
        const sql = `
        SELECT * FROM general_user WHERE user_id IN (
            SELECT sender_id FROM messages WHERE receiver_id = $1
            UNION
            SELECT receiver_id FROM messages WHERE sender_id = $1
        );
        `
        const users = await pool.query(sql, [req.user]);
        console.log(users.rows)
        const user_data = users.rows;
        if(users.rows.length !== 0){
            
            for(const user of user_data){
                const last_message_time = await pool.query(`
                SELECT MAX(time_added) FROM messages WHERE (sender_id = $1 OR receiver_id = $1) AND (sender_id = $2 OR receiver_id = $2);
                `, [req.user, user.user_id]);

                user.last_message_time = last_message_time.rows[0].max;

                const last_message = await pool.query(`
                SELECT * FROM messages WHERE (sender_id = $1 OR receiver_id = $1) AND (sender_id = $2 OR receiver_id = $2) ORDER BY time_added DESC LIMIT 1;
                `, [req.user, user.user_id]);

                user.last_message = last_message.rows[0];

                const is_unread = await pool.query(`
                    SELECT COUNT(*) FROM messages WHERE sender_id = $1 AND receiver_id = $2 AND seen_status = false;
                `, [user.user_id, req.user]);

                user.is_unread = is_unread.rows[0].count;
                console.log(user)
            }

            user_data.sort((a, b) => {
                const timeA = new Date(a.last_message_time);
                const timeB = new Date(b.last_message_time);
                return timeB - timeA;
              });
            
        }

        

        // console.log(user_data)
        res.json({
            users: user_data,
            current_user: req.user
        })


    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})



router.get('/get_messages', authorization, async(req, res, next) => {
    try{
        const {user_id} = req.query;
        const messages = await pool.query(`
        SELECT * FROM messages WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1) ORDER BY time_added DESC;
        `, [req.user, user_id]);

        await pool.query(`
        UPDATE messages SET seen_status = true WHERE sender_id = $2 AND receiver_id = $1;`, [req.user, user_id]);
        res.json({
            messages: messages.rows
        })

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/send_message', authorization, async(req, res, next) => {
    try{
        const {receiver_id, message} = req.body;
        const new_message = await pool.query(`
        INSERT INTO messages(sender_id, receiver_id, _message) VALUES($1, $2, $3) RETURNING *;
        `, [req.user, receiver_id, message]);
        res.json({
            message: new_message.rows[0],
            sent: true
        });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;

