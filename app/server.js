'use strict';

// 1: NPM dependencies.
var express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  sequelize = require('sequelize'),
  passport = require('passport'),
  path = require('path'),
  cors = require('cors'),
  jwt = require('jsonwebtoken'),
  cookieParser = require('cookie-parser');



// 2: App related modules.
var hookJWTStrategy = require('./services/passportStrategy');

var favicon = require('serve-favicon');

// 3: Initializations.
var app = express();

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '625233',
  key: '7dfe498ad10368e9b594',
  secret: '55943428ea9c985eaed2',
  cluster: 'us2',
  encrypted: true
});

// 4: Parse as urlencoded and json.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up the favicon route
app.use(favicon(__dirname + '/../favicon.ico'));

// 5: Hook up the HTTP logger.
app.use(morgan('dev'));

// Setup cookie parser
app.use(cookieParser());

// 6: Hook up Passport.
app.use(passport.initialize());
app.use(passport.session());

// Hook the passport JWT strategy.
hookJWTStrategy(passport);

// 7: Set the static files location.
app.use(express.static(__dirname + '../../public'));

// Routing
app.get('/signup', function(req, res) {
  res.sendFile(path.join(__dirname + '../../public/app/views/signup.html'));
});

app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname + '../../public/app/views/login.html'));
});

// app.get('/chat', function(req, res) {
//     res.sendFile(path.join(__dirname + '../../public/app/views/chat.html'));
// });

app.post('/pusher/auth', function(req, res) {
    var socketId = req.body.socket_id;
    var channel = req.body.channel_name;
    var auth = pusher.authenticate(socketId, channel);
    res.send(auth);
  });

  app.post('/message', function(req, res) {
    var message = req.body.message;
    var name = req.body.name;
    pusher.trigger( 'private-chat', 'message-added', { message, name });
    res.sendStatus(200);
  });

// Bundle API routes.
app.use('/api', require('./routes/api')(passport));

app.get('/api/chat', function(req, res) {
  res.sendFile(path.join(__dirname + '../../public/app/views/chat.html'));
});

// enable the use of CORS
app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'});
});

app.listen(8081, function () {
  console.log('CORS-enabled web server listening on port 8081')
});

// Catch all route.
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '../../public/app/views/index.html'));
});

// 9: Start the server.
app.listen('8080', function() {
  console.log('Magic happens at http://localhost:8080/! We are all now doomed!');
});
