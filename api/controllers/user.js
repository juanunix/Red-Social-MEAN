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
    let params = req.body;
    let user = new User();

    if (params.name && params.surname &&
        params.nick && params.email && params.password) {
        user.name = params.name;
        user.surname = params.surname;
        user.nick = params.nick.toLowerCase();
        user.email = params.email.toLowerCase();
        user.password = params.password;
        user.role = 'ROLE_USER';
        user.image = null;

        // controlar usuarios duplicados
        // buscar usuarios duplicados
        User.find({
            $or: [
                {email: user.email},
                {nick: user.nick}
            ]
        }).exec((err, users) => {
            // console.log(users);
            if (err) return res.status(500).send({message: 'Error en la peticion de usuario'});
            if (users && users.length >= 1) {
                return res.status(200).send({message: 'El usuario que intenta registrar ya existe'});
            } else {
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash;
                    user.save((err, userStored) => {
                        if (err) return res.status(500).send({message: 'Error al guardar usuario'});
                        if (userStored) {
                            res.status(200).send({user: userStored, message: 'Usuario registrado correctamente'});
                        } else {
                            res.status(404).send({message: 'No se ha registrado el usuario'});
                        }
                    })
                })
            }
        });


    } else {
        res.status(200).send({
            message: 'Envia todos ls campos necesarios!!'
        });
    }
}

function loginUser(req, res) {
    let params = req.body;
    const email = params.email.toLowerCase();
    const password = params.password;

    User.findOne({email: email}, (err, userLogged) =>{
        if (err) return res.status(404).send({message: 'Error al iniciar Sesion'});
        if(userLogged){
            bcrypt.compare(password, userLogged.password, (err, check)=>{
                if (err) return res.status(404).send({message: 'Error al comprobar credenciales'});
                if(check){
                    // devolver datos de usuario
                    return res.status(200).send({user: userLogged, message: 'Identificado correctamente'});
                }else{
                    return res.status(404).send({message: 'Contrasena incorrecta'});
                }
            })
        }else {
            return res.status(404).send({message: 'El usuario no se pudo identificar!!'});
        }

    })
}

module.exports = {
    home,
    pruebas,
    saveUser,
    loginUser
};