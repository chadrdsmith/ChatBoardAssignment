var express = require('express');
var router = express.Router();
var basicAuth = require('basic-auth');
var Admin = require ('../models/user');
var User = require ('../models/user');
var Message = require ('../models/Messages');
var db = require ('../models/dbServer');
var mongoose = require('mongoose');
var bodyParser = require('body-parser').urlencoded({extended: true});
var cookieParser = require('cookie-parser');

var currentUser = {};
var userSettings = {};

// Middleware

router.use(cookieParser());

// Login Page and create default admin account
router.get('/', function(req, res) {
  const newAdmin = new Admin ({username: 'admin', password: 'admin', isAdmin: true}); 
  newAdmin.save().then( () => console.log("Admin has been saved"));
  res.render('login');

});

// Settings Page
router.get('/settings', function (req, res) {
 
  res.render('settings');
}); 

router.put('/setCookie', function (req, res) {
  userSettings = {
      name: currentUser.username,
      clr: req.body.clr
  };
  
  console.log(userSettings);
  res.cookie(currentUser.username, req.body.clr, {maxAge: 604800400}).send();
});

router.delete('/delete', function (req, res) {
  //remove message
  console.log(req.body.id);
  console.log('from the express');
  Message.findOneAndRemove({_id : req.body.id}, function(err, chats) {
    if (err){
      throw err;
    } else {
      console.log('deleted');
      res.send("Success");
  }}) ;
 
});

// Users Page
router.get('/users', function(req, res) {
  console.log("im called");
  Message.find ({'name': currentUser.username}).limit(5).sort({date: -1})
  .exec(function(err, chats) {
    if(err) {
      throw err;
      
  } else {
  
  res.render('users', {chatters: chats});
  }
  
  
  
  
 
})});






// Login Page
router.get('/registerUser', function(req, res) {
  var name = req.body.username;
  var password = req.body.password;
  const newUser = new User({username: name, password: password});


  res.render('registerUser');
});

// Chatroom Page
router.get('/chatroom', function(req, res) {
  Message.find ({}).limit(5).sort({date: -1})
      .exec(function(err, chats) {
        if(err) {
          throw err;
      } else {
      //console.log(chats);
      res.render('chatroom', {chatters: chats});
      }
})});

router.post ('/form-login', function (req, res) {
  User.findOne({username: req.body.username, password: req.body.password}, function(err, user){
    if (err) {
      throw err;
    } else if (user) {
      console.log('found user');
      currentUser = user;
      console.log(currentUser);
      res.redirect('chatroom');
    } else {
      console.log("cant find it");
      var inv = "Please try again"
      res.render ('login', {invalid: inv });
    }
  })
  
  
 
});

router.post ('/newUser', function (req, res) {
  var name = req.body.username;
  var password = req.body.password;
  var admin = req.body.admin ? true : false;
  
  const newUser = new User({username: name, password: password, isAdmin: admin});
  newUser.save().then( () => console.log("User has been saved"));  
  res.render('registerUser');
});



router.post('/chatbox', function(req, res) {
  var message = req.body.message;
  var name = currentUser.username;
  console.log(name);
  const newMessage = new Message({name: name, message: message});
  newMessage.save()
  .then(function () { 
    Message.find ({}).limit(5).sort({date: -1})
      .exec(function(err, chats) {
        if(err) {
          throw err;
      } else {
      console.log(chats);
      res.render('chatroom', {chatters: chats});
       
}});
    

})});



module.exports = router;