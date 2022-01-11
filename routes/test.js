const { Router } = require('express');
const router = Router();


const {create,
     createQuestion, 
     addQuestionToTest,
     addResponseToQuest,
     getTestById
} 
     = require('../controllers/test');



router.post('/create/test', create);
router.post('/add/question', createQuestion);
router.post('/add/questiontotest', addQuestionToTest);
router.post('/add/response', addResponseToQuest);
router.get('/get/test/:id', getTestById);

 
module.exports = router;