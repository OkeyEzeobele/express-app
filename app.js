var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var logger = require('morgan');

mongoose.connect('mongodb://localhost:8080/loginapp', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
.then(()=> console.log('Database Connected'))
.catch(err => console.log(err));

var db = mongoose.connection;
var router = express.Router();


//routes
var routes = require('./routes/index');
var users=require('./routes/users');

//init app
var app=express();
app.use(logger('dev'));


app.set('views', path.join(__dirname,'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());



//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//express session
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave:true
}));

//passport init
app.use(passport.initialize());
app.use(passport.session());


//connect flash
app.use(flash());

//global vars
app.use(function(req,res,next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', routes);
app.use('/users', users);

//set port
app.set('port', (process.env.PORT || 8080));

app.listen(app.get('port'), function(){
  console.log('server started on port'+ app.get('port'));
});
