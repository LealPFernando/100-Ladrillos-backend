const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: ['http://localhost:3001'],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);
app.use(express.json());

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

app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Server runnig on port ${port}`);
});
