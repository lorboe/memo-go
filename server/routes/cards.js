const express = require('express');
const mongoose = require('mongoose');
const Card = require('../models/Card')

// The same as: const checkId = require('../middlewares').checkId
const { checkId, isLoggedIn } = require('../middlewares')

const router = express.Router();

// Route to get all countries
router.get('/', (req, res, next) => {
  Card.find()
  .populate('_owner', 'name') // populate on _owner and only send the name and _id (default)
    .then(cards => {
      res.json(cards);
    })
    .catch(err => next(err))
});

// Route to get the detail of a Card
router.get('/:id', checkId('id'), (req, res, next) => {
  let id = req.params.id
  Card.findById(id)
    .then(cardDoc => {
      res.json(cardDoc)
    })
})

// Route to update a card
router.put('/:cardId', isLoggedIn, checkId('cardId'), (req, res, next) => {
  let id = req.params.cardId
  Card.findByIdAndUpdate(id, {
    question: req.body.question,
    answers: req.body.answers,
    visibility: req.body.visibility,
    difficulty: req.body.difficulty,
  })
    .then(cardDoc => {
      res.json({
        success: !!cardDoc // true only if a card was found
      })
    })
    .catch(err => next(err))
})

// Route to add a card
router.post('/', isLoggedIn, (req, res, next) => {
  let { question, answers, visibility, difficulty } = req.body
  let _owner = req.user._id
  Card.create({ question, answers, visibility, difficulty, _owner })
    .then(card => {
      res.json({
        success: true,
        card
      });
    })
    .catch(err => next(err))
});

router.delete('/:id', isLoggedIn, checkId('id'), (req, res, next) => {
  let id = req.params.id
  Card.findByIdAndDelete(id)
    .then(cardDoc => {
      console.log("DEBUG cardDoc", cardDoc)
      res.json({
        // !!myVariable converts truthy to true and falsy to false
        success: !!cardDoc,
        card: cardDoc,
        // message: "This is just a test!"
      })
    })
    .catch(err => next(err))
})

module.exports = router;
