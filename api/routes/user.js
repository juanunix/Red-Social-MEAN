'use strict';
const express = require('express');
const UserController = require('../controllers/user');
const api = express.Router();
const md_auth = require('../middlewares/authenticated');

api.get('/pruebas', md_auth.ensureAuth, UserController.pruebas);
api.get('/home', UserController.home);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.get('/user/:id', md_auth.ensureAuth, UserController.getUser);
api.get('/users/:page?', md_auth.ensureAuth, UserController.getUsers);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
module.exports = api;