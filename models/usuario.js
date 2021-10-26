const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UsuarioSchema = Schema({

    correo: {
        type: String,
        required: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true,  
    },
    img_perfil: {
        type: String,
        required: false,
    },
    estado:{
        type: String,
        required:false,
        default: 'inhabilitado' //  disponible, inhabilitado,  habilitado  
    },
    rol: {
        type: String,
        required: false,
        default: 'USER_ROLE' //USER_ROLE, AUX_ROLE, ADMIN_ROLE
    },
    
}, { collection: "usuarios", timestamps: true });


UsuarioSchema.method('toJSON', function() {
    const { __v, contrasena, ...object } = this.toObject();
    return object;
})


UsuarioSchema.plugin(uniqueValidator, { message: '{PATH} have to be unique' });
module.exports = model('Usuario', UsuarioSchema);