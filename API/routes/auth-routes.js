const router = require('express').Router();
const passport = require('passport');

const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  }
});;

router.get('/login', (req,res) => {
  res.render('login');
})


router.get('/code', (req,res) => {
  res.render('code');
})

router.get('/logout', (req,res) => {
  req.logout();
  res.redirect('/auth/login');
})

router.post('/code', (req,res) => {
  if (req.body.code === 'thachthucentropy') {
    knex('users').insert(req.session.user).then(newUser => {
      res.contentType('application/json');
      res.redirect('https://thongcam.github.io/entropy-questions/UI/index.html');
    }).catch(console.log)
  } else {
    res.contentType('application/json');
    res.redirect('https://thongcam.github.io/entropy-questions/UI/index.html');
  }
})

router.get('/google', passport.authenticate('google',{
  scope: ['profile']
}))

router.get('/google/callback', passport.authenticate('google'), (req,res) => {
  // res.send(req.user);
  if (!req.user) {
    res.redirect("/login")
  } else {
    knex.select('*').from('users').where('id','=',req.user.id).then(data => {
      if (data[0] !== undefined) {
        res.redirect('https://thongcam.github.io/entropy-questions/UI/index.html')
      } else {
        req.session.user = req.user;
        res.redirect('/auth/code')
      }
    })
  }
});

module.exports = router;
