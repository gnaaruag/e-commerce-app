const express = require('express');
const app = express();
const route = express.Router();

const {onboardUser, verifyLogin, checkCreds} = require("../controllers/auth.controller");

const authmiddleware = require("../middleware/isAuth")

route.post('/signup', onboardUser);
route.post('/login', verifyLogin);
route.post('/check-creds', checkCreds)
route.get('/test', authmiddleware, (req,res)=>{
    res.send('session auth implemented');
});
route.post('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.send('Logout successful');
  });

module.exports = route;