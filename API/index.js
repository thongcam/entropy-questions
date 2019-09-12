const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var session = require('express-session');
const cors = require('cors');
const pg = require('pg');
const authRoutes =  require('./routes/auth-routes');
const keys = require('./config/keys');
const knex = require('./config/knexSQL');
const bcrypt = require('bcrypt');

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

const app = express();

app.use(cors(options));
app.use(session({ secret: keys.cookie.secret,resave: false,
    saveUninitialized: true, cookie: { maxAge: 60000, secure: true }}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/auth', authRoutes);

const authCheck = (req,res,next) => {
  if (!req.cookies.user || req.cookies.user.password === undefined) {
    res.json('Authentication required');
  } else {

    if (req.cookies.user.username === 'thachthucentropy') {
      bcrypt.compare(req.cookies.user.password, keys.hash, function(err, result) {
        if (result) {
          next()
        } else {
          res.json('Authentication required');
        }
    })
    } else {
      res.json('Authentication required');
    }
  }
}

app.get('/', authCheck, (req,res) => {
  knex.select('*').from('cau_hoi').then(data => res.json({
    questions:data,
  }))
});

app.post('/add-question', authCheck,  addQuestion.addQuestion(knex));

app.get('/questions/:question_id', authCheck,  getQuestion.getQuestion(knex));

app.put('/edit-question/:question_id', authCheck,  editQuestion.editQuestion(knex));

app.delete('/delete-question/:question_id', authCheck,  deleteQuestion.deleteQuestion(knex));


app.listen(process.env.PORT || 3000,() => {
  console.log(`App is running`);
})
