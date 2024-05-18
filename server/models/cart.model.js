const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Cart schema
const cartSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  productId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
