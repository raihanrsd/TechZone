// this is the primary configuration. You might need to make a separate file for the app and db configuration



const express = require('express');
require('dotenv').config();
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// connecting database
const pool = require('./db');

var adminIndexRouter = require('./router/adminIndexRouter');
var usersRouter = require('./router/indexRouter');


const port = process.env.PORT || 5000;

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(morgan('dev'));
app.use('/admin', adminIndexRouter);
app.use('/', usersRouter);
app.use('/auth', require('./router/jwtAuth'));
app.set('view engine', 'jade');

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

