const express = require('express');
const app = express();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

// const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getAuxiliares,
    getAuxiliarById,
    getAuxiliarByAsignatura,
    getAuxiliarByNombre,
    getAuxiliarByMateria
} = require('../controllers/auxiliar')



app.get('/getallaux', getAuxiliares);

app.get('/getauxbyid/:id',
    // validarJWT,
    getAuxiliarById
);

app.get('/getauxiliar/:asignatura', getAuxiliarByAsignatura);
app.get('/getauxiliarbynombre', getAuxiliarByNombre);
app.get('/getauxbymateria', getAuxiliarByMateria);

module.exports = app;



