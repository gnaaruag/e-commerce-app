const express = require('express');
const app = express();
const route = express.Router();

const {addItem, deleteItem, editItem, getItems} = require("../controllers/cart.controller");


route.post('/add-cart-item', addItem);
route.post('/delete-cart-item', deleteItem);
route.post('/edit-cart-item', editItem)
route.post('/get-cart-items', getItems)


module.exports = route;