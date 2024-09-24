const express = require('express');
const app = express();
const passport = require('./auth'); 
const Database = require('./Database.js'); 

 // Fixed variable name
require('dotenv').config(); 

 
app.use(express.json()); // Ensure JSON parsing middleware is available

const PORT = process.env.PORT || 3000;

// Initialize Passport
app.use(passport.initialize());

// Passport Local Authentication Middleware
// const localAuthMiddleware = passport.authenticate('local', { session: false });

// Protected route with Passport middleware
app.get('/Life', (req, res) => {
  res.send('Yes, I am always here for you.');
});

// Import the router files
// const Personroutes = require('./routes/Personroutes.js');
const Menuroutes = require('./routes/Menuroute.js');

// Use the routers with authentication middleware
// app.use('/person', localAuthMiddleware, Personroutes);
 app.use('/menu', Menuroutes);


// Start the server
app.listen(PORT, () => { 
  console.log(`Server is listening on port ${PORT}`); 
}); 
 
  