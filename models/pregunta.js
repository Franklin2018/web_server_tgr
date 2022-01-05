const { Schema, model } = require('mongoose');

//Response Model
var responseSchema = Schema({
    r1: {
        type: String,
        required: true
    },
    r2: {
        type: String,
        required: false
    },
    r3: {
        type: String,
        required: false
    },
    r4: {
        type: String,
        required: false
    },
    rc: {
        type: String,
        required: true
    },

});



const PreguntaSchema = Schema({

    pregunta:{
        type: String,
        required: true
    },
    respuestas: [responseSchema],
    
});


PreguntaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Pregunta', PreguntaSchema);