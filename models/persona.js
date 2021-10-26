const { Schema, model } = require('mongoose');

const PersonaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: false,
        default: 'sin direccion'
    },
    celular: {
        type: String,
        required: true,
        default: 'sin celular'
    },
    genero: {
        type: String,
        required: false,
        default: 'Hombre'
    },
    fecha_nacimiento: {
        type: Date,
        required: false,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});


PersonaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Persona', PersonaSchema);