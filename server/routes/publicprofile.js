const express = require('express');
const mongoose = require('mongoose');
const Deck = require('../models/Deck');
const Card = require('../models/Card');
const User = require('../models/User')

// The same as: const checkId = require('../middlewares').checkId
const { checkId, isLoggedIn } = require('../middlewares')

const router = express.Router();

// Route to get all decks
router.get('/public-profile/', (req, res, next) => {

  Deck.find()
  .populate('_owner') // populate on _owner and only send the username and _id (default)
    .then(decks => {
      res.json(decks);
    })
    .catch(err => next(err))
});



// Route to get the detail of a deck
router.get('/public-profile/:id', checkId('id'), (req, res, next) => {
  let id = req.params.id
  Promise.all([
    Deck.findById(id).lean().populate('_owner'),
    Card.find({_deck: id}),
    User.findById(req.user._id)
  ])
    .then(([deckDoc,cardDocs,userDocs]) => {
      deckDoc.cards = cardDocs
      user = userDocs
      res.json({
        deckDoc,
        user
      })
    })
  
})

// Route to update a deck
router.put('/public-profile/:deckId', isLoggedIn, checkId('deckId'), (req, res, next) => {
  let id = req.params.deckId
  let newDeck= null
    Deck.findByIdAndUpdate(id, {
    title: req.body.title,
    category: req.body.category,
    difficulty: req.body.difficulty,
    visibility: req.body.visibility,
    description: req.body.description,
  }, {new: true}) 
  .then(result => {
   newDeck = result
    return  Promise.all([
      Deck.findById(id).lean().populate('_owner'),
      Card.find({_deck: id}),
      User.findById(req.user._id)
    ])
      .then(([deckDoc,cardDocs,userDocs]) => {
        deckDoc.cards = cardDocs
        user = userDocs
        res.json({
          deckDoc,
          user
        })
      })
    })
  .catch(err => next(err))
  })

// Route to add a name


module.exports = router;
