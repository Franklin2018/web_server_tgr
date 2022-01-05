const express = require('express');
const app = express();

//Calling the defined routes
app.use(require('./usuarios'));
 app.use(require('./login'));
app.use(require('./test'));
//app.use(require('./login'));
app.use(require('./asignatura'));
app.use(require('./auxiliar'));

module.exports = app;