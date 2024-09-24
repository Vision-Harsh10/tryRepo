const mongoose = require('mongoose');

require('dotenv').config();

// const mongoURL = 'mongodb://localhost:27017/Rooms';
// const mongoURL = 'mongodb+srv://harshvardhanmet22:22145041harsh@cluster0.mwzox.mongodb.net/'
// const mongoURL = process.env.MONGODB_URL;
const mongoURL = process.env.MONGODB_URL_LOCAL;

mongoose.connect(mongoURL,{
    // useNewUrlParser :  true,
    // useUnifiedTopology : true
})

const db = mongoose.connection;
  
db.on('connected' , ()=> {
    console.log('MongoDB server connected');  
});  

db.on('error', (err) => {
    console.error('MongoDB Connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB server disconnected');
});

// // Graceful shutdown on app termination
// process.on('SIGINT', async () => {
//     await mongoose.connection.close();
//     console.log('MongoDB connection closed due to app termination');
//     process.exit(0);
// });


module.exports = { 
    db
}
 