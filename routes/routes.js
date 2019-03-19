var express = require('express');
var router = express.Router();
basicAuth = require('basic-auth');
// Login Page
router.get('/', function(req, res) {
  res.render('login');
 
});

router.post ('/form-login', function (req, res) {
    res.send('Post request from login page');
});

module.exports = router;