var express = require('express');
var router = express.Router();
var basicAuth = require('basic-auth');
var User = require ('../models/user');
var Message = require ('../models/Messages');
var db = require ('../models/dbServer');
var mongoose = require('mongoose');
bp = require('body-parser').urlencoded({extended: true});




// Login Page
router.get('/', function(req, res) {
  res.render('login');

});

// Users Page
router.get('/users', function(req, res) {

res.render('users');
 
});

// Login Page
router.get('/registerUser', function(req, res) {
res.render('registerUser');
});

// Chatroom Page
router.get('/chatroom', function(req, res) {
  res.render('chatroom');
});




  

router.post ('/form-login', function (req, res) {
  var name = req.body.username;
  var password = req.body.password;
 
  const newUser = new User({username: name, password: password});
  //newUser.save().then( () => console.log("User has been saved"));  

 
  res.render('chatroom');
});

router.post ('/newUser', function (req, res) {
  var name = req.body.username;
  var password = req.body.password;
 
  const newUser = new User({username: name, password: password});
  newUser.save().then( () => console.log("User has been saved"));  
 
  res.render('registerUser');
});



router.post('/chatbox', function(req, res) {
  var message = req.body.message;
  //console.log(message);
  //res.render('chatroom', {message: message});
  const newMessage = new Message({message: message});

  // mongoose.connect(db, function(err,db) {
  //   if(err)
  //     throw err;
  // }

  newMessage.save().then( () => console.log("chat saved"));

 Message.find ({})
 .exec(function(err, chats) {
  if(err) {
    throw err;
  } else {
    //console.log(chats);
    var mes = chats.message;
    console.log(mes);
    res.render('chatroom', {mes: mes});
  }
});
    
    
    
    

 
  
  

  
});

module.exports = router;