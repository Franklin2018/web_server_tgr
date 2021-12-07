const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getAuxiliares,
    getAuxiliarById,
    getAuxiliarByAsignatura,
    getAuxiliarByNombre
} = require('../controllers/auxiliar')


const router = Router();

router.get('/', getAuxiliares);

router.get('/:id',
    validarJWT,
    getAuxiliarById
);

router.get('/getauxiliar/:asignatura', getAuxiliarByAsignatura);
router.post('/getauxiliarbynombre', getAuxiliarByNombre);

module.exports = router;

// router.post('/', [
//         // validarJWT,
//         check('persona', 'El campo persona es requerido').isMongoId(),
//         validarCampos
//     ],
//     crearMedico
// );

// router.put('/:id', [
//         validarJWT,
//         check('persona', 'El campo persona es requerido').isMongoId(),
//         validarCampos
//     ],
//     actualizarMedico
// );

// router.delete('/:id',
//     validarJWT,
//     borrarMedico
// );


