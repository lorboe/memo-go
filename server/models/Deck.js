const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deckSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The deck title is required'],
     minlength: 1
  },
  // description: {type: String},
  category: {
    type: String, 
    enum:["web development", "languages", "business", "other"], 
    required:true,
    default: "other"
  },
  difficulty: {
    type: String, 
    enum: ["beginner", "advanced-beginner", "experienced", "expert"], 
    default: "beginner" 
  },
  visibility: {
    type: String, 
    enum:["public", "private"], 
    default: "public"
  },
 
   _owner: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ]
});

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;