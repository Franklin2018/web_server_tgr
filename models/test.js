const { Schema, model } = require('mongoose');


const TestSchema = Schema({

    asignatura:{
        type: Schema.Types.ObjectId,
        ref: 'Asignatura',
        required: true
    },
    calificacionMinima:{
        type: String,
        default: '51',
        required: false
    },
    preguntas: [{
        type: Schema.Types.ObjectId,
        required: false
    }],
    
});


TestSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Test', TestSchema);