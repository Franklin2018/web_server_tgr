const { Schema, model } = require('mongoose');


const EstudianteSchema = Schema({

    carrera: {
        type: String,
        required: true,
    },
    persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: false
    }
    
});


EstudianteSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})




module.exports = model('Estudiante', EstudianteSchema);