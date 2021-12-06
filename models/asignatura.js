const { Schema, model } = require('mongoose');


const AsignaturaSchema = Schema({

    nombre:{
        type:String,
        require: true
    },
    estado:{
        type:Boolean,
        default: true,
        require:false
    },
    descripcion: {
        type: String,
        default: 'Sin descripcion',
        required: false
    }    
});


AsignaturaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Asignatura', AsignaturaSchema);