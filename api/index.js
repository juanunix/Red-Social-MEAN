'use strict';
const mongoose = require('mongoose');
const app = require('./app');
const port = 3800;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/curso_mean_social', {useMongoClient: true})
    .then(() => {
        console.log('Conexion correcta con MongoDB');

        //crear servidor
        app.listen(port, () => {
            console.log('servidor corriendo en localhost:3800');
        });
    })
    .catch(err => console.log(err));