const express = require('express');
const app = express();
var {createUser} = require('../controllers/usuarios');
var {pushImageToUser} = require('../controllers/auxiliar');

//Routes
app.post('/register', createUser);
//app.put('/client/:id', userController.update);
app.post('/upload/image/:id', pushImageToUser);





module.exports = app;

