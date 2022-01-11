const { Router } = require('express');
const router = Router();


const {
    createRoom,
    addStudentToClass,
    getStudentByAuxId
} 
     = require('../controllers/clases');



router.post('/create/room/:asigId/:auxId', createRoom);
 router.post('/add/student', addStudentToClass);
router.get('/get/students/:auxId/:asigId', getStudentByAuxId);
// router.get('/get/test/:id', getTestById);


module.exports = router;