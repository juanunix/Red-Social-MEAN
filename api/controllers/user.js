'use strict';
const User = require('../models/user');

//rutas
function home(req, res) {
    res.status(200).send({
        message: 'Hola Mundo desde el servidor'
    });
}
function pruebas(req, res) {
    res.status(200).send({
        message: 'pruebas con nodejs'
    });
}

module.exports = {
    home,
    pruebas
};