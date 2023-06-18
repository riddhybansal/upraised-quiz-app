import questions, { answers } from '../database/data.js'
import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";

export async function getQuestions(req,res){
    try {
        const q = await Questions.find();
        res.json(q)
    } catch (error) {
        res.json({ error })
    }
}

// POST questions
export async function addQuestions(req,res){
    try {
        Questions.insertMany({ questions, answers }).then( function(err, data){
            res.json({ msg: "Data Saved Successfully...!"})
        })
    } catch (error) {
        res.json({ error })
    }
}
//get score
export async function getScore(req,res){
    try {
        const r = await Results.find();
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

export async function saveScore(req,res){
    try {
        const { username, result, attempts, points, achived } = req.body;
        if(!username && !result) throw new Error('Data Not Provided...!');

        Results.create({ username, result, attempts, points, achived }).then( function(err, data){
            res.json({ msg : "Result Saved Successfully...!"})
        })

   } catch (error) {
        res.json({error})
   }
}