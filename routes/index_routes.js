const express = require('express');
const app = express();

//Calling the routes defined
app.use(require('./usuarios'));
// app.use(require('./room'));
//app.use(require('./login'));
app.use(require('./asignatura'));


module.exports = app;