var express= require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var db = mongoose.connection;
var router = express.Router();
var LocalStrategy = require('passport-local').Strategy;
const { check, validationResult } = require('express-validator');

var User = require('../models/user');

//Register
router.get('/register', function(req,res){
  res.render('register');
});

//login
router.get('/login', function(req,res){
  res.render('login');
});

//Register User
router.post('/register', (req,res) =>{
var name = req.body.name;
var email = req.body.email;
var username = req.body.username;
var password = req.body.password;
var password2 = req.body.password2;

//validation
router.post('/register',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty().isLength({min: 5}),
    check('password2', 'Passwords do not match').equals(req.body.password)
  ], 
  function(req, res, next) {

  // Check Errors
  const errors = validationResult(req);
if(errors){
res.render('register', {
  errors:errors
});
} else {
var newUser = new User({
  name:name,
  email:email,
  username:username,
  password:password
});
User.createUser(newUser, function(err,user){
  if(err) throw err;
  console.log(user);
});
req.flash('success_msg','You are registered and can now log in.');
res.redirect('/users/login');
}
});

passport.use(new LocalStrategy(
  function(username, password, done){
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message:"Unknown user."});
      }
      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message:'Invalid password'});
        }
      });
    });
  }));
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done){
    User.getUserById(id, function(err, user){
      done(err, user);
    });
  });

router.post('/login', passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash: true}), function(req,res){
res.redirect('/');
});
router.get('/logout', function(req,res){
  req.logout();
  req.flash('success', 'logout successfull');
  res.redirect('/users/login');
});
})
module.exports = router;

