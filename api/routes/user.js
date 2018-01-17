'use strict';
const express = require('express');
const UserController = require('../controllers/user');
const api = express.Router();

api.get('/pruebas', UserController.pruebas);
api.get('/home', UserController.home);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
module.exports = api;