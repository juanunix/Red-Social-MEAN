'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//cargar rutas
const user_routes = require('./routes/user');

//midlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//cors

//rutas
app.use('/api', user_routes);

//exportar
module.exports = app;