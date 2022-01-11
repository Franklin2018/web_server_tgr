const { Router } = require('express');


const {crearAsignatura, 
    getAsignaturas,
    pushAsignaturaToUser,
    getAsignaturaById,
    test
} = require('../controllers/asignatura');


const router = Router();

router.post('/crearasignatura', crearAsignatura);
router.post('/pushtouser', pushAsignaturaToUser);
router.get('/getasignaturas', getAsignaturas);
router.get('/getasignatura/:id', getAsignaturaById);
router.get('/test', test);


module.exports = router;