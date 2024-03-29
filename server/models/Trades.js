const { Schema, model } = require('mongoose');

const tradeSchema = new Schema({
  // _id: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  date: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    trim: true,
  },
  cardCollection: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Card',
    },
  ],
});

const Trade = model('Trade', tradeSchema);

module.exports = Trade;
