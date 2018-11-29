const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "You must add a question"],
    minlength: 1
  },
  answers: {
    type: [String],
    default: []
  },
  // visibility: {
  //   type: String, 
  //   enum:["public", "private"], 
  //   default: "public"
  // },
  difficulty: {
    type: String, 
    enum: ["beginner", "advanced-beginner", "experienced", "expert"], 
    default: "beginner" 
  },
  owner_assessment: {
    type: String, 
    enum: ["easy", "hard"], 
    defult: "hard"
  },
  assessment_easy: Number,
  assessment_hard:Number,
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
