const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const dotenv = require('dotenv');

const config = require('./configuration');
const routes = require('./routes/router');

const app = express();

app.use(cors());

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require('dotenv').config({path: __dirname + '/.env'})
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

dotenv.config({path: __dirname + '/.env'})
app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));

app.use('/', routes);

app.listen(config.PORT, () => console.log(`App is running at http://localhost:${config.PORT}`));

module.exports = app;
