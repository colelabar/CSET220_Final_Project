'use strict';

// NPM dependencies
var express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  sequelize = require('sequelize'),
  session = require('express-session'),
  passport = require('passport'),
  path = require('path'),
  cors = require('cors'),
  jwt = require('jsonwebtoken'),
  cookieParser = require('cookie-parser'),
  DOMpurify = require('dompurify'),
  http = require('http');

const rateLimit = require("express-rate-limit");



// App related modules
var hookJWTStrategy = require('./services/passportStrategy');
var config = require('./config');
var favicon = require('serve-favicon');
var db = require('./services/database');
var Message = require('./models/message');

// Initializations
var app = express();

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: "625233",
  key: "a19df17ab917f69b30da",
  secret: "af5072bbfd6a37a39df7",
  cluster: "us2",
  encrypted: false
});

// Parse as urlencoded and json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up the favicon route
app.use(favicon(__dirname + '/../favicon.ico'));

// Hook up the HTTP logger
app.use(morgan('dev'));

// Allows for the use of the rate limiter
app.enable("trust proxy");

// Setup cookie parser
app.use(cookieParser());

// Hook up Passport
app.use(session({ resave: true, saveUninitialized: true,  secret: config.keys.secret }));
app.use(passport.initialize());
app.use(passport.session());

// Hook the passport JWT strategy
hookJWTStrategy(passport);

// Set the static files location
app.use(express.static(__dirname + '../../public'));

// Routing
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '../../public/app/views/index.html'));
});

app.get('/signup', function(req, res) {
  res.sendFile(path.join(__dirname + '../../public/app/views/signup.html'));
});

app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname + '../../public/app/views/login.html'));
});

app.get('/privacy', function(req, res) {
  res.sendFile(path.join(__dirname + '../../public/app/views/privacy-policy.html'));
});

app.get('/401', function(req, res) {
res.sendFile(path.join(__dirname + '../../public/app/views/401.html'));
});

app.get('/403', function(req, res) {
res.sendFile(path.join(__dirname + '../../public/app/views/403.html'));
});

app.post('/pusher/auth', function(req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});

// functionality for the rate limiter
const messageLimiter = rateLimit({
  windowMs: 15000, // 15 second window
  max: 10, // start blocking after 10 requests
  message:
    "Don\'t spam the chat, cool off and try again in a bit"
});

app.post('/message', messageLimiter, function(req, res) {
  var message = req.body.message;
  var name = req.body.name;
  var time = req.body.time;
  pusher.trigger( 'private-chat', 'client-message-added', { message, name, time });
  db.sync().then(function() {
    var newMessage = {
      username: name,
      message: message
    }
    return Message.create(newMessage).then(function() {
      res.sendStatus(200);
    }).catch(function(error) {
      res.status(403).json({ message: 'Hmm...something seems to have gone wrong' });
    });
  });
});

// Bundle API routes
app.use('/api', require('./routes/api')(passport));

app.get('/api/chat', function(req, res) {
  res.sendFile(path.join(__dirname + '../../public/app/views/chat.html'));
});

app.get('/api/admin', function(req, res) {
  res.sendFile(path.join(__dirname + '../../public/app/views/admin.html'));
});

// enable the use of CORS
app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'});
});

const host = '0.0.0.0';
const port = process.env.PORT || 8080;

app.listen(port, host, function () {
  console.log('CORS-enabled web server listening on port 8080')
});

// Catch all route.
app.get('*', function(req, res) {
  res.location('/');
  res.end();
});

module.exports = app.listen(8081);
