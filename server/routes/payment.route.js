const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const bodyParser = require('body-parser');

const route = express.Router();

const { checkOut } = require ("../controllers/payment.controller");

route.post("/create-checkout-session", checkOut);

module.exports = route;