const express = require('express');

const quizController = require('../controllers/quizController')

const router = express.Router();

router.get('/get-Answers', quizController.getAnswers);

router.get('/createQuiz', quizController.createQuiz);

module.exports = router;