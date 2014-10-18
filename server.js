// server.js
// Get all necessary tools
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 5000;
var path     = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


// Link to database configuration
var configDB = require('./config/database.js');

// configuration ===============================================================
  mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport);
// pass passport for configuration



// set up our express application
  app.use(morgan('dev')); // log every request to the console
  app.use(cookieParser()); // read cookies (needed for auth)
  app.use(bodyParser.json()); // get information from html forms
        app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static("public", __dirname + "/public"))
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs'); // set up ejs for templating

  // required for passport
  app.use(session({ secret: 'Gravity4Project' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session


  // routes ======================================================================
  require('./routes.js')(app, passport);
  // load our routes and pass in our app and fully configured passport







// launch ======================================================================


app.listen(port, function () {
    console.log('OOTD server listening on port 5000');
});