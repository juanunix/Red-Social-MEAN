'use strict';
const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');

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
function saveUser(req, res) {
    const params = req.body;
    let user = new User();

    if (params.name && params.surname &&
        params.nick && params.email && params.password){
        user.name = params.name;
        user.surname = params.surname;
        user.nick = params.nick;
        user.email = params.email;
        user.password = params.password;
        user.role = 'ROLE_USER';
        user.image = null;

        bcrypt.hash(params.password, null, null, (err, hash) =>{
            user.password = hash;
            user.save((err, userStored) =>{
                if (err) return res.status(500).send({message: 'Error al guardar usuario'});
                if (userStored){
                    res.status(200).send({user: userStored, message: 'Usuario registrado correctamente'});
                }else{
                    res.status(404).send({message: 'No se ha registrado el usuario'});
                }
            })
        })
    }else {
        res.status(200).send({
            message: 'Envia todos ls campos necesarios!!'
        });
    }
}

module.exports = {
    home,
    pruebas,
    saveUser
};