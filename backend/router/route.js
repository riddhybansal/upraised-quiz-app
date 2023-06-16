import { Router } from "express";
import * as controller from '../controllers/controller.js'
const router=Router();

//for questions


router.route('/questions').get(controller.getQuestions).post(controller.addQuestions)
router.route('/score').get(controller.getScore).post(controller.saveScore)

export default router;