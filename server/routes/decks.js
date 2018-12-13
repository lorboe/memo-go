const express = require('express');
const mongoose = require('mongoose');
const Deck = require('../models/Deck');
const Card = require('../models/Card');
const User = require('../models/User');

// The same as: const checkId = require('../middlewares').checkId
const { checkId, isLoggedIn } = require('../middlewares')

const router = express.Router();

// Route to get all decks
router.get('/', (req, res, next) => {
  Deck.find()
    .populate('_owner', 'name email pictureUrl')
    .then(decks => {
      console.log('req.user', req.user, decks)
      res.json({
        decks,
        user: req.user
      });
    })
    .catch(err => next(err))
});



// Route to get the detail of a deck
router.get('/:id', checkId('id'), (req, res, next) => {
  let id = req.params.id
  Promise.all([
    Deck.findById(id).lean().populate('_owner'),
    Card.find({ _deck: id }),
  ])
    .then(([deckDoc, cardDocs]) => {
      deckDoc.cards = cardDocs
      res.json({
        deckDoc,
        user: req.user
      })
    })

})

// Route to update a deck
router.put('/:deckId', isLoggedIn, checkId('deckId'), (req, res, next) => {
  let id = req.params.deckId
  Deck.findByIdAndUpdate(id, {
    title: req.body.title,
    category: req.body.category,
    difficulty: req.body.difficulty,
    visibility: req.body.visibility,
    // description: req.body.description,
  }, { new: true })
    .then(result => {
      return Promise.all([
        Deck.findById(id).lean().populate('_owner'),
        Card.find({ _deck: id }),
      ])
        .then(([deckDoc, cardDocs, userDocs]) => {
          deckDoc.cards = cardDocs
          user = userDocs
          res.json({
            deckDoc,
            user: req.user
          })
        })
    })
    .catch(err => next(err))
})

// Route to add a name
router.post('/', isLoggedIn, (req, res, next) => {
  let { title, category, visibility, difficulty } = req.body
  let _owner = req.user._id
  Deck.create({ title, category, visibility, difficulty, _owner })
    .then(deck => {
      res.json(deck)
    })
    .catch(err => next(err))
});



router.delete('/:id', isLoggedIn, checkId('id'), (req, res, next) => {
  // TODO: first, delete all cards in the deck to delete
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

router.post("/:deckId/copy-deck/", checkId('deckId'), isLoggedIn, (req, res, next) => {
  Promise.all([
    User.findById(req.user._id),
    Deck.findById(req.params.deckId),
    Card.find({_deck: req.params.deckId}, "-_id").lean()
  ])
    .then(([user, deck, cards]) => {
      let newDeck = {
        title: deck.title,
        category: deck.category,
        difficulty: deck.difficulty,
        visibility: deck.visibility,
        _owner: user._id
      }
      Deck.create(newDeck)
        .then(deckCreated => {
          Card.create(cards.map(card => ({...card, _deck: deckCreated._id})))
          .then(cardsCreated => {
            res.json({
              success: true,
              deck: deckCreated,
              cards: cardsCreated,
            });
          })
        })
    })
})


module.exports = router;
