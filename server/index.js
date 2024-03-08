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
const authorization = require('./middlewares/authorization');


const port = process.env.PORT || 5001;

const cors = require('cors');


const multer = require('multer');
const path = require('path');
const fs = require('fs');


app.use(cors());
app.use(express.json());
app.use('/images/products', express.static(path.join(__dirname, 'public/images/products')));
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(morgan('dev'));
app.use('/admin', adminIndexRouter);
app.use('/', usersRouter);
app.use('/auth', require('./router/jwtAuth'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the destination folder for uploads
      const uploadPath = path.join(__dirname, 'public', 'images', 'products');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      // Generate a unique filename for each uploaded file
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
  });

  const upload = multer({ storage: storage });

  app.post('/upload/:name', upload.array('images'), (req, res) => {
    // Access uploaded files via req.files
    const imageUrls = req.files.map((file) => `/images/${req.params.name}/${file.filename}`);
    console.log("comes here");
    console.log(imageUrls);
    // Respond with the generated image URLs
    res.json({ imageUrls });
  });


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });