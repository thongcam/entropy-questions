const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pg = require('pg');

const addQuestion = require('./controllers/addQuestion');
const deleteQuestion = require('./controllers/deleteQuestion');
const editQuestion = require('./controllers/editQuestion');
const getQuestion = require('./controllers/getQuestion');

const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString : 'postgres://postgres:DATlmaoABAs5!@localhost:5432/cau_hoi',
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {knex.select('*').from('cau_hoi').then(data => res.send(data))});

app.post('/add-question', addQuestion.addQuestion(knex));

app.get('/questions/:question_id', getQuestion.getQuestion(knex));

app.put('/edit-question/:question_id', editQuestion.editQuestion(knex));

app.delete('/delete-question/:question_id', deleteQuestion.deleteQuestion(knex));


app.listen(3000,() => {
  console.log(`App is running on port 3000`);
})
