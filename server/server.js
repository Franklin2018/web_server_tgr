require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').Server(app);
const { dbConnection } = require('../database/config');
const cors = require('cors');
app.use(cors());


//Connection to json
app.use(express.json());

//Load routes index
app.use('/api', require('../routes/index_routes'));


//Connect to database
dbConnection();

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Conectado al puerto', process.env.PORT);
});