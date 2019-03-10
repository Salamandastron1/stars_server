/*eslint-disable*/
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const corsOptions = {
  origin: 'https://salamandastron1.github.io/hubble-bubble/',
  optionsSuccessStatus: 200,
};

app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/users', (req, res, next) => {
  const { body } = req;
  if (Object.keys(body).length > 2) {
    return res.status(403).json({
      message: 'forbidden amount of sent parameters',
    });
  }
  const missingProps = [];
  ['email', 'password'].forEach((param) => {
    if (!body[param]) {
      missingProps.push(param);
    }
  });
  next();
});

routes(app);

module.exports = app;
