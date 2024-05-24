const express = require('express');
const app = express();
const route = express.Router();

const { orderFetch } = require('../controllers/order.controller');

route.post("/orders", orderFetch);

module.exports = route;