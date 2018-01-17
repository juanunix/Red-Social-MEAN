'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//cargar rutas


//midlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//cors

//rutas
app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hola Mundo desde el servidor'
    });
});
app.get('/pruebas', (req, res) => {
    res.status(200).send({
        message: 'pruebas con nodejs'
    });
});

//exportar
module.exports = app;