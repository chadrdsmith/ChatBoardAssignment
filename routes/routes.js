var express = require('express');
var router = express.Router();
var User = require ('../models/user');
var Message = require ('../models/Messages');
var db = require ('../models/dbServer');
var mongoose = require('mongoose');
var bodyParser = require('body-parser').urlencoded({extended: true});
var cookieParser = require('cookie-parser');
var credentials = require('../credentials');
var sessions = require('express-session');
var md5 = require ('md5');

var currentUser = {};
var userSettings = {};
var direction = '';

// Middleware

router.use(cookieParser(credentials.cookieSecret));

// Sessions Middleware
router.use(sessions({
  resave: true,
  saveUninitialized: false,
  secret: credentials.cookieSecret,
  cookie: {maxAge: 3600000},
}));

//ROUTES

// Landing Page. Check for admin account and create default admin account if not there

router.get('/', function(req, res) {
  res.render('login');
});

// Login Page. Check for user credentials

router.post ('/form-login', function (req, res) {
  
  var p = md5(req.body.password);
  User.findOne({username: req.body.username, password: p}, function(err, user){
    var p = md5(req.body.password);
    
    if (err) {
      res.status(401);
      res.render('login',{invalid: 'Error accesing database. Try again'});
      
    } 
    
    if (user != null) {
     
        if (user.password == p) {
          currentUser = user;
          req.session.user = user;
          res.redirect(303, 'chatroom');
        } 
        else {
          res.status(401);
          res.render ('login', {invalid: 'Wrong username or password.' });
        }
    }
    else {
          res.status(401);
          res.render ('login', {invalid: 'Wrong username or password.' });
    }
  })
});

// Chat Page. Both Admin and Regular users can post. Only Admin can delete posts.

router.get('/chatroom', function(req, res) {
  var cur = -1;
  if (req.session.user){
    var u = '';
    u = currentUser.username+'direction';
    cur = req.cookies[u];
    Message.find ({}).sort({date: cur})
        .exec(function(err, chats) {
          if(err) {
            throw new Error (err);
        } else {
          res.render('chatroom', {chatters: chats});
        }
    })}
  else {
    res.status(401);
    res.render('login', {invalid: "Please login for access"});
  }
});

// Chat Page. Posting chats to chatboard for both Admin and Regular Users.

router.post('/chatbox', function(req, res) {
  var canP = currentUser.canPost;
  var message = req.body.message;
  var name = currentUser.username;
  
  if (canP){
  const newMessage = new Message({name: name, message: message});
  newMessage.save()
    .then(function () { 
      Message.find ({}).sort({date: -1})
        .exec(function(err, chats) {
          if(err) {
            throw new Error (err);
          } else {
          res.render('chatroom', {chatters: chats});
  }});
})
}
  else {
   
      Message.find ({}).sort({date: -1})
        .exec(function(err, chats) {
          if(err) {
            throw new Error (err);
          } else {
          res.render('chatroom', {chatters: chats, alert: "Your account has been disabled"});
  }});

  }
});

// Chat Page. Deleting Posts from chatboard. Only for Admin users.

router.delete('/deleteChat', function (req, res) {
  var check = req.session.user 
  if (check.isAdmin) {
    Message.findOneAndRemove({_id : req.body.id}, function(err, chats) {
      if (err){
        throw new Error (err);
      } else {
        res.send("Success");
    }}) ;
  }
  else {
    res.status(301).send({error: 'error'});
  }
});

// User Posts. Display the posts for the current user.

router.get('/users', function(req, res) {
  var cur = -1;
  if (req.session.user){
    var u = '';
    u = currentUser.username+'direction';
    cur = req.cookies[u];
    Message.find ({'name': currentUser.username}).sort({date: cur})
      .exec(function(err, chats) {
        if(err) {
          throw new Error (err);
        } else {
          res.render('users', {chatters: chats});
        }
      }) 
    }
  else {
    res.status(401);
    res.render('login', {invalid: "Please login for access"});
  }
 });


//User Posts. Allow user to delete their current Posts

router.delete('/delete', function (req, res) {
  Message.findOneAndRemove({_id : req.body.id}, function(err, chats) {
    if (err){
      throw new Error (err);
    } else {
      res.send("Success");
  }}) ;
});


// Register Page. Check for login credentials. Only for Admin users

router.get('/registerUser', function(req, res) {
  if (req.session.user) {
      var check = req.session.user 
      if (check.isAdmin) {
        res.render('registerUser');
      }
      else {
        res.render('registerUser', {alert: 'You do not have permission!!!'})
      }
  }
  else {
    res.status(401);
    res.render('login', {invalid: "Please login for access"});
  }    
});

// Register Page. Post for creating new users. Only for Admin users.

router.post ('/newUser', function (req, res) {
  var name = req.body.username;
  var password = md5(req.body.password);
  var admin = req.body.admin ? true : false;
  const newUser = new User({username: name, password: password, isAdmin: admin});
  newUser.save().then( () => console.log("User has been saved"));  
  res.render('registerUser', {confirm: name + " has been saved to the database"});
});

// Current Users. List of all Users. For Admin eyes only.

router.get('/currentUsers', function(req, res) {
  if (req.session.user){
    var check = req.session.user 
      if (check.isAdmin) {
        User.find ({}).sort({username: -1})
          .exec(function(err, users) {
            if(err) {
              throw new Error (err);
            } 
            else 
            {
            res.render('currentUsers', {users: users});
            }
          }
        )}
      else {
        res.render('currentUsers', {alert: 'You do not have permission!!!'})
    }
  } else {
    res.status(401);
    res.render('login', {invalid: "Please login for access"});
  }
});

// Current Users. Allow Admin to delete users.

router.delete('/deleteUser', function (req, res) {
  var check = req.session.user 
  if (check.isAdmin) {
    User.findOneAndRemove({_id : req.body.id}, function(err, chats) {
      if (err){
        throw new Error (err);
      } else {
        res.send("Success");
    }}) ;
  }
  else {
    res.status(301).send({error: 'error'});
  }
});

// Current Users. Allow Admin to disable regular user from posting to chat page.

router.put('/disableUser', function (req, res) {
  var check = req.session.user 
  if (!check.isAdmin) {
    res.status(301).send({error: 'error'});
  }
  else {
    User.findOne({_id : req.body.id}, function(err, user) {
      if (err){
        throw new Error (err);
      } 
      else {
          user.canPost = !user.canPost;
          user.save();    
          res.send("Success");
      }
    })
  }
});

// Settings Page. Allows users to change settings. For admin and regular users.

router.get('/settings', function (req, res) {
  if (req.session.user){
  res.render('settings');
  } else {
    res.status(401);
    res.render('login', {invalid: "Please login for access"});
  }
}); 

// Settings Page. Set cookie to store user settings for post direction. 

router.put('/setDirection', function (req, res) {
  res.cookie(currentUser.username +'direction', req.body.dir, {maxAge: 604800400}).send();
  res.end();
});

// Settings Page. Set Cookies to store user settings for background color.
router.put('/setCookie', function (req, res) {
  userSettings = {
      name: currentUser.username,
      clr: req.body.clr
  };
  res.cookie(currentUser.username, req.body.clr, {maxAge: 604800400}).send(currentUser.username);
});

// Get current User

router.get('/currentUser', function(req, res) {
    res.send(currentUser.username);
});

// Logout Page. Logout user and remove sessions

router.get('/logout', function(req, res) {
  delete req.session.user;
  res.status(303);
  res.render('login');
});

module.exports = router;