const { response } = require('express');
const Asignatura = require('../models/asignatura');


const crearAsignatura = async (req,res)=>{

    const {nombre} =  req.body;

    const existeAsignatura = await Asignatura.findOne({ nombre});


    try {
        if (existeAsignatura) {
            return res.status(400).json({
                ok: false,
                msg: 'La Asignatura ya fue registrada'
            });
        }

        const asignatura = new Asignatura(req.body);
        
        await asignatura.save();

        res.json({
            ok: true,
            asignatura,
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}
const getAsignaturas = async(req, res) => {
    Asignatura.find({}, 'nombre').exec( (err, asignaturas) =>{
        if (err) {
          return res.status(400).json({
             ok:false,
             err:err
           });
         }
         res.json({
           ok: true,
           asignaturas
         })
      })
}

module.exports = {
   crearAsignatura,
   getAsignaturas,
}