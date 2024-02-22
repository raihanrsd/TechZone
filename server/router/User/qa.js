const express = require('express');
const router = express.Router();
const pool = require('../../db');
const authorization = require('../../middlewares/authorization');


router.post('/question',authorization, async (req, res, next) => {
    try{
        const {product_id, question} = req.body;
        console.log(product_id, question, req.user);
        const sql = `
        INSERT INTO product_qa (user_id, product_id, question_text) VALUES ($1, $2, $3)
        `;
        await pool.query(sql, [req.user, product_id, question]);
        const questions = await pool.query('SELECT *, (SELECT username FROM general_user WHERE user_id = QA.user_id) AS username FROM product_qa QA WHERE product_id = $1 ORDER BY time_asked DESC', [product_id]);

        await Promise.all(questions.rows.map(async (question) => {
            const answers = await pool.query('SELECT *, (SELECT username FROM general_user WHERE user_id = A.user_id) AS username FROM product_qa_answers A WHERE question_id = $1 ORDER BY time_answered DESC', [question.question_id]);
            question.answers = answers.rows;
        }));
        res.json({
            message: 'Question added successfully', 
            questions: questions.rows
        })
    }
    catch(err){
        console.log(err.message);
    }
})

router.post('/answer',authorization, async (req, res, next) => {
    try{
        const {question_id, answer} = req.body;
        const user = pool.query('SELECT * FROM general_user WHERE user_id = $1', [req.user]);
        if(user.staff_status !== 'admin'){
            return res.status(401).json({message: 'Unauthorized'});
        }
        const sql = `
        INSERT INTO product_qa_answers(question_id, user_id, answer_text) VALUES ($1, $2, $3)`;
        await pool.query(sql, [question_id, req.user, answer]);
        const answers = await pool.query('SELECT *, (SELECT username FROM general_user WHERE user_id = A.user_id) AS username FROM product_qa_answers A WHERE question_id = $1 ORDER BY time_answered DESC', [question_id]);
        res.json({
            message: 'Answer added successfully', 
            answers: answers.rows
        })
    }
    catch(err){
        console.log(err.message);
    }
});


router.get('/question/:id', async(req, res, next) => {
    try{
        const {id} = req.params;
        const questions = await pool.query('SELECT *, (SELECT username FROM general_user WHERE user_id = QA.user_id) AS username FROM product_qa QA WHERE product_id = $1 ORDER BY time_asked DESC', [id]);
        await Promise.all(questions.rows.map(async (question) => {
            const answers = await pool.query('SELECT *, (SELECT username FROM general_user WHERE user_id = A.user_id) AS username FROM product_qa_answers A WHERE question_id = $1 ORDER BY time_answered DESC', [question.question_id]);
            question.answers = answers.rows;
        }));
        res.json({
            message: 'These are all the question', 
            questions: questions.rows
        })
    }
    catch(err){
        console.log(err.message);
    }
})


module.exports = router;