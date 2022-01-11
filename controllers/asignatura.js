const { response, request } = require('express');
const Asignatura = require('../models/asignatura');
const Auxiliar = require('../models/auxiliar');

const { dbConnection } = require('../database/config');
const test=async(req,res)=>{
 res.json({ok: true,
    uri:process.env.MONGO_URI});
};

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


const pushAsignaturaToUser = async (req=request,res=response)=>{

    const {asignaturaId,id} =  req.body;
    let sw=false;

    const existeAsignatura=await Auxiliar.findById(id,(err,auxiliarDB)=>{

        auxiliarDB.asignatura.forEach(asignatura => {
        if(asignatura==asignaturaId){
            sw=true;
        }
    });

    if(!sw){
        auxiliarDB.asignatura.push(asignaturaId);
        auxiliarDB.save((err,responseDB)=>{
            return res.status(200).json({
                ok:true,
                auxiliar:responseDB
            });
        });

     }
    });


    try {
        if (sw) {
            return res.status(400).json({
                ok: false,
                message: 'La Asignatura ya fue registrada'
            });
        }


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


const getAsignaturaById = async(req, res) => {

    const id = req.params.id;

    Asignatura.findById(id).exec( (err, asignatura) =>{
        if (err) {
          return res.status(400).json({
             ok:false,
             err:err
           });
         }
         res.json({
           ok: true,
           asignatura
         })
      })
}




module.exports = {
   crearAsignatura,
   getAsignaturas,
   pushAsignaturaToUser,
   getAsignaturaById,
   test
}