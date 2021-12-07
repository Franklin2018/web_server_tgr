//controlador login
const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const Persona = require('../models/persona');
const Estudiante = require('../models/estudiante');
const Auxiliar = require('../models/auxiliar.js');
// const Medico = require('../models/medico');
const { generarJWT } = require('../helpers/jwt');
//const { getMenuFrontEnd } = require('../helpers/menu-frontend');
const { esEstadoDenegadoRol } = require('../helpers/access-estado');


const login = async(req, res = response) => {

    const { correo, contrasena } = req.body;


    try {
        const usuarioDB = await Usuario.findOne({ 'correo': correo });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Correo no encontrado'
            });
        }
        const personaDB = await Persona.findOne({ 'usuario': usuarioDB.id });

        if (esEstadoDenegadoRol(usuarioDB.estado)) {
            console.log('Usuario no disponible  temporalmente');
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no disponible temporalmente'
            });
        }


        // Verificar contraseña
        const validPassword = bcrypt.compareSync(contrasena, usuarioDB.contrasena);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);

        const data = await getDataByRol(usuarioDB.rol, personaDB.id);

        res.json({
            ok: true,
            token,
            // #added
            usuario: usuarioDB,
            persona: personaDB,
            data: data,

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador maifren'
        })
    }
}





const renewToken = async(req, res = response) => {

    const uid = req.uid;
    // Generar el TOKEN - JWT
    const token = await generarJWT(uid);

    // Obtener el usuario por UID
    const personaDB = await Persona.findOne({ 'usuario': uid });
    if (!personaDB) {
        return res.status(404).json({
            ok: false,
            msg: 'Schema Persona no encontrado'
        });
    }
    try {
        const usuario = await Usuario.findById(uid);

        const data = await getDataByRol(usuario.role, personaDB.id); // data = oficial o civil

        res.json({
            ok: true,
            token,
            usuario,
            persona: personaDB,
            data,
            menu: getMenuFrontEnd(usuario.role)
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador usuario no valido'
        })
    }


}


const getDataByRol = async(role, id) => {
    var dataDB;
    switch (role) {
        // case 'MEDICO_ROLE':
        //     dataDB = await Medico.findOne({ 'persona': id });
        //     break;
        case 'USER_ROLE':
            dataDB = await Estudiante.findOne({ 'persona': id });
            break;
        case 'AUX_ROLE':
            dataDB = await Auxiliar.findOne({ 'persona': id });
            break;    
    }
    return dataDB;
}




module.exports = {
    login,
    renewToken
}