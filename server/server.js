require ('dotenv').config();
const bodyparser = require('body-parser');
const express = require('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const mongosession = require('connect-mongodb-session')(session)

const connectDB = require('./db/db');

const app = express() 
connectDB();

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use((express.static('public')))
app.use(cookieparser());

const store = new mongosession({
    uri: process.env.MONGO_URI,
    collection: "sessions",
});

const corsOptions = {
    origin: process.env.CLIENT_URL,
  credentials: true
  };
  

app.use(
    session({
        key: 'uid',
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000 * 60 * 12 * 7,
            
        },
        store: store,
    })
);





app.use(cors(corsOptions));


app.get('/logout', (req,res) => {
    req.session.destroy((err) => {
        if (err) {
            throw err;
        }
        res.redirect('/')
    });
});


const auth = require('./routes/auth.route.js');
const cart = require("./routes/cart.route.js")
const pay = require("./routes/payment.route.js")
const order = require("./routes/order.route.js")

app.use('/',auth);
app.use('/', cart);
app.use('/', pay);
app.use('/', order)


const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
{   
    console.log(`listening on ${PORT}`);
});
