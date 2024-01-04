const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'techzone_admin',
    password: '123456789',
    host: 'localhost',
    post: 5432,
    database: 'techzone'
});


module.exports = pool;

