// Requirements
var express = require ('express'),
      mongoose = require('mongoose'),
      dbServer = require ('./models/dbServer'),
      User = require ('./models/user.js');
      dbSeed = require ('./models/seedAdmin'),
      routes = require('./routes/routes'),
      bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({
    defaultLayout:'main',
    helpers: { }
});

// Express Middleware    
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(require('body-parser').urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// seed admin user
dbSeed.seed(User);

// Routes
app.use ('/', routes);

//custom 404 page
app.use(function(req, res){
    res.status(404);
    res.send('404 - Page Not Found');
});

//custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.send('500 - Internal Server Error');
});

// Express Listening Port
app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});