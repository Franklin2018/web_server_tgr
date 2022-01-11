const { response, request } = require('express');
const AsignaturaClase = require('../models/asignaturaClase');
const Persona = require('../models/persona');
const { v4: uuidv4 } = require('uuid');



 //Create room for meeting in class
const createRoom = async(req= request, res = response) => {   
    const roomName = `${ uuidv4() }`;
    const asigId = req.params.asigId;
    const auxId = req.params.auxId;


    var sala = {
        url: roomName,
    };

    const asignatura = new AsignaturaClase({
        asignatura:asigId,
        auxiliar:auxId,
        sala:sala
    });

    await asignatura.save((err, asignaturaSave)=>{
        if(err){return res.status(500).json({ok:false, err});}

       return  res.json({
            ok: true,
            room:asignaturaSave,
        });

    });

}

 //Add student to class
const addStudentToClass = async (req=request,res=response)=>{
    const {studentId, auxId, asigId} =  req.body;

   


    AsignaturaClase.findOne({asignatura:asigId, auxiliar: auxId},(err, claseDB)=>{

       
       claseDB.estudiante.push(studentId);
        claseDB.save((err, response)=>{
            return res.status(200).json({
                ok:true,
                room:response
            });
        }); 
       

    });

}


//Mostrar alumnos por clase
const getStudentByAuxId=async (req=request, res=response)=>{
    const auxId = req.params.auxId;  
    const asigId = req.params.asigId;

  

    const clase = await AsignaturaClase.findOne({asignatura:asigId, auxiliar: auxId}).
    populate({ path: 'estudiante', model: Persona });

    res.json({
        ok:true,
        estudiantes:clase.estudiante
    })
    
    }





 


module.exports = {
    createRoom,
    addStudentToClass,
    getStudentByAuxId
    // getTestById
}