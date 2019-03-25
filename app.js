// Requirements
var express = require ('express'),
      mongoose = require('mongoose'),
      Comment = require('./models/user'),
      basicAuth = require('basic-auth'),
      dbServer = require ('./models/dbServer'),
      routes = require('./routes/routes');

var handlebars = require('express-handlebars').create({
    defaultLayout:'main',
    helpers: { 
  
}
});


// Express Middleware    
var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(require('body-parser').urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// Routes
app.use ('/', routes);

// Authorization Middleware
// app.use(function (req, res, next) {
//     var user = basicAuth(req);

//     if (!user || !user.name || !user.pass) {
//         res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
//         res.status(401);
//         res.render('401');
//     }

//     if (user.name === 'chenry' && user.pass === 'test') {
//         next();
//     } else {
//         res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
//         res.status(401);
//         res.render('401');
//     }
// });




//custom 404 page
app.use(function(req, res){
    res.status(404);
    res.send('404');
});

//custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.send('500');
});

// Express Listening Port
app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});