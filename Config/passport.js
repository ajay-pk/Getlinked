const  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport=require('passport');
const dbconnection=require('./db')
const keys = require('../.gitignore/keys');
const User = require('../models/user')

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID:keys.Google.clientId ,
        clientSecret: keys.Google.clientSecret,
        callbackURL: 'http://localhost:3000/login/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        }
        console.log(profile);

        try {
          let user = await User.findOne({ googleId: profile.id })

          if (user) {
             console.log('user present')
            return done(null, user)
          } else {
            user = await User.create(newUser)
            return done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    console.log(user.id)
    return done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}