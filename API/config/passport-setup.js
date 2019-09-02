const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');

const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  }
});

const log = (req,res,next) => {
  console.log(req);
  next();
}

passport.serializeUser((user,done) => {
  done(null,user.id)
})

passport.deserializeUser((id,done) => {
  knex.select('*').from('users').where('id','=',id).then(user =>
    {
      done(null,user)
    }
  )
})

passport.use(new GoogleStrategy({
    clientID: keys.google.googleClientID,
    clientSecret: keys.google.googleClientSecret,
    callbackURL: 'https://stark-waters-92757.herokuapp.com/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    const currentUser = {
      id: profile.id,
      name: profile.displayName,
      photo: profile.photos[0].value,
      role: ''
    }
    done(null,currentUser);
  })
)
