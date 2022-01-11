const { response } = require('express');
var { upload } = require('../config_Cloudinary/config');
const Auxiliar = require('../models/auxiliar');
const Persona = require('../models/persona');
const Usuario = require('../models/usuario');
const Asignatura = require('../models/asignatura');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});


const getAuxiliares = async(req, res = response) => {

    const auxiliares = await Auxiliar.find()
        .populate('persona', 'nombre apellido img')
    res.json({
        ok: true,
        auxiliares
    })
}
const getAuxiliarById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const auxiliar = await Auxiliar.findById(id)
            .populate('persona', 'nombre apellido img')
             .populate({ path: 'asignatura', model: Asignatura });

        res.json({
            ok: true,
            auxiliar
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const getAuxiliarByAsignatura = async(req, res = response) => {

    const nombreAsignatura = req.params.asignatura;

    await Auxiliar.find({ asignatura: nombreAsignatura }, 'calificacion asignatura').populate('persona', 'nombre apellidos')
        .exec((err, auxilaresDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: "hable con el administrador"
                });
            }
            res.json({
                ok: true,
                auxilaresDB
            })
        })

}


const getAuxiliarByNombre = async(req, res = response) => {
    const nombre = req.body.nombre;
    const regexName = new RegExp(nombre, 'i');

    try {
        var usuarioDB = await Usuario.find({ nombre: regexName, role: 'AUX_ROLE', estado: "habilitado" },
            'nombre img email').sort('nombre');



        var listaAuxiliares = [];
        var index = 0;
        if (usuarioDB.length == 0) {

            const auxiliares = await Auxiliar.find({ asignatura: regexName });

            if (auxiliares.length == 0) {
                return res.status(404).json({
                    ok: false
                })
            }

            auxiliares.forEach(async(auxilar) => {
                var personaDB = await Persona.findById(auxilar.persona);
                var usuarioDB = await Usuario.findById(personaDB.usuario);

                var data = {
                    usuario: usuarioDB,
                    persona: personaDB,
                    auxilar: auxilar
                }

                listaAuxiliares.push(data);

                index = index + 1;

                if (index == (auxiliares.length)) {

                    return res.json({
                        ok: true,
                        auxiliares,
                    });
                }
            });
        } else {
            usuarioDB.forEach(async(usuario) => {

                const personaDB = await Persona.findOne({ "usuario": usuario._id }, 'nombre apellido celular');

                const auxilarDB = await Auxiliar.findOne({ "persona": personaDB._id }, 'calificacion asignatura descripcion');

                // console.log(medicoDB);
                var data = {
                    usuario: usuario,
                    persona: personaDB,
                    auxiliar: auxilarDB
                }

                listaAuxiliares.push(data);

                index = index + 1;

                if (index == (usuarioDB.length)) {

                    return res.json({
                        ok: true,
                        listaAuxiliares,
                    });
                }
            });
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const getAuxiliarByMateria = async(req, res = response) => {
    const nombre = req.body.materia;
    let sw='true';
    const idMateria= await Asignatura.find({nombre},'_id');
    var idMateriaFinal=idMateria[0]._id;
    var listaAuxEncontrados=[];

    const auxiliares= await Auxiliar.find((err,auxDB)=>{
        
        auxDB.forEach(aux=>{

            aux.asignatura.forEach(asig=>{
             
                if(asig.equals(idMateriaFinal)){
                    listaAuxEncontrados.push(aux.persona);
                }
        });
    
    
        });
    }).populate({ path: 'persona', select: 'nombre apellidos usuario', populate: { path: 'usuario', select:"img_perfil" }});
    

    res.json({
        ok: true,
        listaAuxEncontrados
    });

}

const pushImageToUser = async(req, res = response) => {
    const id = req.params.id;

    upload(req, res, (err) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
                //Guardar en cloudinary la imagen original y obtener la url
                cloudinary.uploader.upload(req.file.path, (err, result) => {
                   if (err) { return res.status(500).json({ ok: false, err }); }

                    //Captura el link de la imagen original y luego lo pusheamos en el user
                    imgUrl = result.url;
                    //Guardamos ambos link en la DB con un solo id 
                    Usuario.findById(id).exec((err, auxDB)=>{
                   if (err) { return res.status(500).json({ ok: false, err }); }
                      auxDB.img_perfil=imgUrl
                      auxDB.save((err, auxiliar)=>{res.json({ok:true, auxiliar});});  
                    });
                    // return res.status(200).json({
                    //     imgUrl
                    // });
                });
    });
   
}


module.exports = {
    getAuxiliares,
    getAuxiliarById,
    getAuxiliarByAsignatura,
    getAuxiliarByNombre,
    getAuxiliarByMateria,
    pushImageToUser
}