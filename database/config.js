const mongoose = require('mongoose');
require('dotenv').config();
const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Database online!!!');

    } catch (error) {
        console.log(error);
        throw new Error('Connection database error!!!');

    }
}

module.exports = {
    dbConnection
}