const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const Usuario = require('../models/usuario');
const Persona = require('../models/persona');
const Estudiante = require('../models/estudiante');
const Auxiliar = require('../models/auxiliar');


//Create a user, person and student
const createUser = async(req = request, res = response) => {
    const { contrasena, rol, correo } = req.body;

    try {

        const user = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.contrasena = bcrypt.hashSync(contrasena, salt);
        user.estado = getEstadoFromRole(rol);

        // Save user
        await user.save(); //end save

        userId = user._id;
       
       

        const persona = new Persona({
            usuario: userId,
            ...req.body
        });
         
        // Guardar persona
        await persona.save();

        var data;
        //Save estudiante/auxiliar
        switch (rol) {
            case 'USER_ROLE':
                data = new Estudiante({
                    persona: persona._id,
                    ...req.body
                });
                await data.save();
                break;
            case 'AUX_ROLE':
                data = new Auxiliar({
                    persona: persona._id,
                    ...req.body
                });
                await data.save();
                break;    
        }


        // Generar el TOKEN - JWT
        const token = await generarJWT(user.id);

        res.json({
            ok: true,
            usuario: user,
            persona,
            data,
            token
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


};

const getEstadoFromRole = (rol) => {

    switch (rol) {
        case 'USER_ROLE':
            return 'habilitado'
        case 'AUX_ROLE':
            return 'inhabilitado'
        case 'ADMIN_ROLE':
            return 'habilitado'
        default:
            return 'inhabilitado'
    }


}

module.exports={
    createUser
}