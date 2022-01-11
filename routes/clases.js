const { Router } = require('express');
const router = Router();


const {
    createRoom,
    addStudentToClass,
    getStudentByAuxId,
    getNombreSala,
    cambiarEstadoSala
} 
     = require('../controllers/clases');



router.post('/create/room/:asigId/:auxId', createRoom);
 router.post('/add/student', addStudentToClass);
router.get('/get/students/:auxId/:asigId', getStudentByAuxId);
router.get('/getnombresala/:auxId/:asigId', getNombreSala);
router.put('/cambiarnombresala/:auxId/:asigId/:estado', cambiarEstadoSala);


module.exports = router;