const { Router } = require('express');


const {crearAsignatura, getAsignaturas,pushAsignaturaToUser} = require('../controllers/asignatura');


const router = Router();

router.post('/crearasignatura', crearAsignatura);
router.post('/pushtouser', pushAsignaturaToUser);
router.get('/getasignaturas', getAsignaturas);


module.exports = router;