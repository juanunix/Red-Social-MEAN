'use strict';
const jwt = require('jwt-simple');
const moment = require('moment');
const global = require('../services/global');
exports.ensureAuth = function (req, res, next) {
  if (!req.headers.authorization){
      return res.status(404).send({message: 'No estas enviando token de autorizacion'});
  }
  const token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        var payload = jwt.decode(token, global.secret);
        if (payload.exp <= moment().unix()){
            return res.status(401).send({
                message: 'El token ha expirado'
            });
        }
    }catch(ex) {
        return res.status(401).send({
            message: 'El token no es valido'
        });
    }
    req.user = payload;
    next();
};