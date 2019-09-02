const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
var session = require('express-session');
const cors = require('cors');
const pg = require('pg');
const authRoutes =  require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');

const addQuestion = require('./controllers/addQuestion');
const deleteQuestion = require('./controllers/deleteQuestion');
const editQuestion = require('./controllers/editQuestion');
const getQuestion = require('./controllers/getQuestion');

var whitelist = ['https://stark-waters-92757.herokuapp.com',
                      'https://thongcam.github.io'];

var options = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1|| !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }, credentials: true
}

const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  }
});

const app = express();

app.use(cors(options));
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['thachthucentropy']
}));
app.use(session({ secret: keys.cookie.secret, cookie: { maxAge: 60000, secure: true }}));;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);

app.set('view engine', 'ejs');

const authCheck = (req,res,next) => {
  if (!req.user || req.user[0] === undefined) {
    res.json('Authentication required');
  } else {
    console.log(req.user);
    knex.select('*').from('users').where('id','=',req.user[0].id).then(data => {
      if (data[0] !== undefined) {
        res.contentType('application/json');
        next();
      } else {
        res.json('Authentication required');
      }
    })
  }
}

app.get('/', authCheck, (req,res) => {
  knex.select('*').from('cau_hoi').then(data => res.json({
    questions:data,
    userPhoto: req.user[0].photo,
    username: req.user[0].name,
  }))
});

app.post('/add-question', authCheck,  addQuestion.addQuestion(knex));

app.get('/questions/:question_id', authCheck,  getQuestion.getQuestion(knex));

app.put('/edit-question/:question_id', authCheck,  editQuestion.editQuestion(knex));

app.delete('/delete-question/:question_id', authCheck,  deleteQuestion.deleteQuestion(knex));


app.listen(process.env.PORT || 3000,() => {
  console.log(`App is running`);
})
