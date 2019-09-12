const router = require('express').Router();
const knex = require('../config/knexSQL');
const keys = require('../config/keys');
const bcrypt = require('bcrypt');

router.post('/login', (req,res) => {
  if (req.body.username === 'thachthucentropy') {
    bcrypt.compare(req.body.password, keys.hash, function(err, result) {
      if (result) {
        const user = {
          username: req.body.username,
          password: req.body.password,
        }
        res.cookie('user', user).json('Success');
      } else {
        res.json('Failed');
      }
  })} else {
    res.json('Failed');
  }
});

router.get('/logout', (req,res) => {
  cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }
        res.cookie(prop, '', {expires: new Date(0)});
    }
  res.redirect('http://thongcam.github.io/Authentication/index.html');
})

module.exports = router;
