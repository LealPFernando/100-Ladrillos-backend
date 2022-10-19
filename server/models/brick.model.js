const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const brickSchema = new Schema({
  name: { type: String, required: true },
  shoppingCart: { type: Boolean, required: true },
  owner: { type: String, required: false },
});

const Brick = mongoose.model('Brick', brickSchema);

module.exports = Brick;
