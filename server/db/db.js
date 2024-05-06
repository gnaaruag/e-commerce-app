const mongoose = require('mongoose');


const connectDB = async () =>
{
    try {
        mongoose.set('strictQuery',true);
        await mongoose.connect(process.env.MONGO_URI);
            console.log('connected to database...');
    }
    catch (err) {
        console.log(err.message);
        console.log('db error');
        process.exit(1); 
    }
};

module.exports = connectDB;