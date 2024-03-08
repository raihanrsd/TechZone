const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: '123456',
    host: 'localhost',
    post: 5432,
    database: 'techzone'
});


module.exports = pool;

