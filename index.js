const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const appRoute = require('./route/app');
const userRoute = require('./route/user');

mongoose.set('strictQuery', false);

const dbString = process.env.DATABASE_URL;
const port = process.env.PORT;

mongoose.connect(dbString);
const db = mongoose.connection;
db.on('error', (error) => {
  console.log(error);
});
db.on('connected', () => {
  console.log('database is connected');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', appRoute);
app.use('/api', userRoute);

app.use('', (req, res) => {
  res.json('page is not found');
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
