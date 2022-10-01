const { Schema, model } = require('mongoose');

const cardSchema = new Schema({
  cardId: {
    type: String,
    required: true,
    unique: true,
  },
  typeOfTrade: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    trim: true,
  },
});

const Card = model('Card', cardSchema);

module.exports = Card;
