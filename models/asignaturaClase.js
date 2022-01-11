const { Schema, model } = require('mongoose');


var salaSchema = Schema({
    url: {
        type: String,
        required: true
    },
    estado:{
        type: Boolean,
        required:false,
        default: false //  disponible, inhabilitado,  habilitado  
    },

});

 

const asigClase = Schema({

    asignatura:{
        type: Schema.Types.ObjectId,
        ref: 'Asignatura',
        required: true
    },
    auxiliar:{
        type: Schema.Types.ObjectId,
        ref: 'Auxiliar',
        required: true
    },
    estudiante: [{
        type: Schema.Types.ObjectId,
        required: false
    }],
    sala: salaSchema,
    
});


asigClase.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('AsignaturaClase', asigClase);