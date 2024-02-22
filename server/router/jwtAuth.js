const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middlewares/validInfo');
const authorization = require('../middlewares/authorization');


router.get('/', (req, res) => {
    res.send('Hello World!');
});


router.post('/register', validInfo, async (req, res) => {
    try{
        // 1. destructure the req.body (name, email, password, contact_no, profile_img, full_name, gender, staff_status

        const { username, email, password, contact_no, profile_img, full_name, gender, staff_status} = req.body;
        console.log(username, email, password, contact_no, profile_img, full_name, gender, staff_status);
        // 2.check if user exists (if user exists then throw error)
        
        const user = await pool.query('SELECT * FROM general_user WHERE email = $1 OR username = $2 OR contact_no = $3', [email, username, contact_no]);
        if(user.rows.length !== 0){
            return res.status(401).send('User already exists');
        }
        // res.json(user.rows[0]);

        // 3. bcrypt the user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        // 4. enter the new user inside our database

        const newUser = await pool.query("INSERT INTO general_user(username, email, password, contact_no, profile_img, full_name, gender, staff_status)VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;", [
            username, email, bcryptPassword, contact_no, profile_img, full_name, gender, staff_status
        ]);

        // res.json(newUser.rows[0]);

        // 5. generating our jwt token

        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({
            token,
            message : "User Registered Successfully!"
        });

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


// login route
router.post('/login', validInfo, async (req, res) => {
    try{
        // 1. destructure the req.body

        const { email, password } = req.body;

        // 2. check if user doesn't exist (if not then we throw error)

        const user = await pool.query('SELECT * FROM general_user WHERE email = $1', [email]);

        if(user.rows.length === 0){
            return res.status(401).json('Password or Email is incorrect');
        }

        // 3. check if incoming password is the same as database password

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if(!validPassword){
            return res.status(401).json('Password or Email is incorrect');
        }

        // 4. give them the jwt token

        const token = jwtGenerator(user.rows[0].user_id);
        res.json({token});

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.get('/is-verify', authorization, async (req, res) => {
    try{
        // if it passes authorization than it is valid
        res.json(true);
        // console.log(req.user);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;