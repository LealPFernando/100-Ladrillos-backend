const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    key: 'userId',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 60 * 24,
    },
  })
);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established succesfully');
});

const userRouter = require('./routes/user');
const brickRouter = require('./routes/brick');
const shoppingCartRouter = require('./routes/shoppingCart');

app.use('/user', userRouter);
app.use('/brick', brickRouter);
app.use('/shopping-cart', shoppingCartRouter);

app.listen(port, () => {
  console.log(`Server runnig on port ${port}`);
});
