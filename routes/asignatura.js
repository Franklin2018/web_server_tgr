const { Router } = require('express');


const {crearAsignatura, getAsignaturas} = require('../controllers/asignatura');


const router = Router();

router.post('/crearasignatura', crearAsignatura);
router.get('/getasignaturass', getAsignaturas);

module.exports = router;