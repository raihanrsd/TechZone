const jwt = require('jsonwebtoken');

require('dotenv').config();


function jwtGenerator(user_id){
    const payload = {
        user: user_id
    };
    console.log("jwtGenerator: " + user_id)
    console.log("jwtGenerator: " + process.env.jwtSecret);
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: '1hr'});
}

module.exports = jwtGenerator;