// this is the primary configuration. You might need to make a separate file for the app and db configuration



const express = require('express');
require('dotenv').config();
const app = express();
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

const firebase = require("firebase/app");
const {getStorage, ref, uploadBytes} = require('firebase/storage')
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.senderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
  };


firebase.initializeApp(firebaseConfig);
const storage = getStorage();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// connecting database
const pool = require('./db');

var adminIndexRouter = require('./router/adminIndexRouter');
var usersRouter = require('./router/indexRouter');
const authorization = require('./middlewares/authorization');


const port = process.env.PORT || 5000;

const cors = require('cors');





app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(morgan('dev'));
app.use('/admin', adminIndexRouter);
app.use('/', usersRouter);
app.use('/auth', require('./router/jwtAuth'));

app.post('/upload', upload.single('filename'), (req, res) => {
    const storageRef = ref(storage, `files/${req.file.originalname}`);
    console.log(req.file);
    uploadBytes(storageRef, req.file.buffer).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        res.send('Uploaded a blob or file!');
    });
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

