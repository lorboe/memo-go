const express = require('express');
const mongoose = require('mongoose');
const Deck = require('../models/Deck');
const User = require('../models/User')

// The same as: const checkId = require('../middlewares').checkId
const { checkId, isLoggedIn } = require('../middlewares')

const router = express.Router();

// Route to get all decks
router.get('/', (req, res, next) => {
  Deck.find()
  .populate('_owner', 'username') // populate on _owner and only send the username and _id (default)
    .then(decks => {
      res.json(decks);
    })
    .catch(err => next(err))
});

// Route to get the detail of a deck
router.get('/:id', checkId('id'), (req, res, next) => {
  let id = req.params.id
  Deck.findById(id)
    .then(deckDoc => {
      res.json(deckDoc)
    })
})

// Route to update a deck
router.put('/:deckId', isLoggedIn, checkId('deckId'), (req, res, next) => {
  let id = req.params.deckId
  Deck.findByIdAndUpdate(id, {
    title: req.body.title,
    category: req.body.category,
    // cards: req.body.cards,
    // likes: req.body.likes,
    description: req.body.description,
  })
    .then(deckDoc => {
      res.json({
        success: !!deckDoc // true only if a deck was found
      })
    })
    .catch(err => next(err))
})

// Route to add a name
router.post('/', isLoggedIn, (req, res, next) => {
  let { title, category, description } = req.body
  let _owner = req.user._id
  
 Deck.create({ title, category, description, _owner })
    .then(deck => {
      console.log("DECK:" + deck)
      res.json({
       deck
    })
    console.log("USER:" + user)
    console.log("USER" + user._deck )
    .catch(err => next(err))
 
  });
})


router.delete('/:id', isLoggedIn, checkId('id'), (req, res, next) => {
  let id = req.params.id
  Deck.findByIdAndDelete(id)
    .then(deckDoc => {
      console.log("DEBUG deckDoc", deckDoc)
      res.json({
        // !!myVariable converts truthy to true and falsy to false
        success: !!deckDoc,
        deck: deckDoc,
        // message: "This is just a test!"
      })
    })
    .catch(err => next(err))
})

module.exports = router;
