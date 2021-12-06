const express = require('express');
const app = express();

var {createUser} = require('../controllers/usuarios');

//Routes
app.post('/register', createUser);
//app.put('/client/:id', userController.update);







module.exports = app;

