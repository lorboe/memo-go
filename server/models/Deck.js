const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The deck title is required'],
    minlength: 1
  },
  category: {
    type: String,
  },
  cards: {
    default: [],
  },
  likes:{
    default: [],
  },
  description: {
    type: String,
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;