//controlador login
const { response, request } = require('express');

const Test = require('../models/test');
const Pregunta = require('../models/pregunta');



const create = async(req= request, res = response) => {   

     
        const test = new Test(req.body);

        await test.save((err, testSave)=>{
            if(err){return res.status(500).json({ok:false, err});}

            res.json({
                ok: true,
                test:testSave,
            });

        });

}

const createQuestion = async(req= request, res = response) => {   

     
    const pregunta = new Pregunta(req.body);

    await pregunta.save((err, preguntaSave)=>{
        if(err){return res.status(500).json({ok:false, err});}

       return  res.json({
            ok: true,
            pregunta:preguntaSave,
        });

    });

}

const addQuestionToTest = async (req=request,res=response)=>{

    const {id, preguntaId} =  req.body;

    Test.findById(id,(err, testDB)=>{
        testDB.preguntas.push(preguntaId);
        testDB.save((err, response)=>{
            return res.status(200).json({
                ok:true,
                test:response
            });
        });

    });

}



const addResponseToQuest = async (req=request,res=response)=>{

    const {id} =  req.body;

       
    Pregunta.findById(id,(err, preguntaDB)=>{

        preguntaDB.respuestas.push(req.body);

        preguntaDB.save((err, response)=>{

            return res.status(200).json({
                ok:true,
                pregunta:response
            });
        });


    });


}









module.exports = {
    create,
    createQuestion,
    addQuestionToTest,
    addResponseToQuest
}