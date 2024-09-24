// auth.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./Models/Person1').Person; // Ensure the correct model is used

// Local Strategy for Passport
passport.use(new LocalStrategy(async (USERNAME, password, done) => {
  try {
    const user = await Person.findOne({ username : USERNAME });
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    // Assuming user.password is the actual password in the database
    const isPasswordMatch = password === user.password ? true : false;
    if (!isPasswordMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    // User authenticated successfully
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// // Passport serialization (optional)
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await Person.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

module.exports = passport;
