var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const expressSession = require('express-session');
const confessionModel = require('../models/confessionSchema');
const adminModel = require('../models/adminSchema');
expressSession.admin = ""; // Initialize session variable to null.

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/confession', async function(req, res, next) {
  const api = await confessionModel.find();
  res.send(api);
})
router.post('/confession', async function(req, res, next) {
  const confession = req.body.confession;
  const createConfession = await confessionModel.create({
    confession: confession,
    user: "Anonymous"
  });
  res.redirect('/');
// Print the confessions to the console for debugging.
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.post('/login', async function(req, res, next) {
  const username = req.body.name;
  const password = req.body.password;
  const admin = await adminModel.findOne({username: username, password: password});
  if(admin){
    expressSession.admin = 'admin';
    res.redirect('/admin');
  }})
router.get('/admin', function(req, res, next) {
  if(expressSession.admin !== 'admin'){
    res.redirect('/login');
  }
  else{
    res.render('admin');
  }
});
module.exports = router;
