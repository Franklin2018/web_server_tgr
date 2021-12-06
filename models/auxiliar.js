const { Schema, model } = require('mongoose');


const AuxiliarSchema = Schema({

    ci:{
        type:String,
        require: true
    },
    asignatura: [{
        type: Schema.Types.ObjectId,
        required: false
    }],
    calificacion: {
        type: Number,
        required: false,
        default: 0
    },
    descripcion: {
        type: String,
        default: 'Sin descripcion',
        required: false
    }, 
    persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: false
    }
    
}, { collection: "auxiliares", timestamps: true});


AuxiliarSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})




module.exports = model('Auxiliar', AuxiliarSchema);