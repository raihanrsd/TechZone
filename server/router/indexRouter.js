const express = require('express');
const router = express.Router();
const pool = require('../db');


/* GET users listing. */
router.get('/', function(req, res, next) {
  try{
    pool.query('SELECT * FROM general_user;', (err, result) => {
      if(err){
        throw err;
      }
      res.status(200).json(result.rows);
    });
  }
  catch(err){
    console.error(err.message);
  }
});

module.exports = router;