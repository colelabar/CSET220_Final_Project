'use strict';

// 1: NPM dependencies.
var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    sequelize = require('sequelize'),
    passport = require('passport'),
    path = require('path'),
    cors = require('cors'),
    jwt = require('jsonwebtoken');

// 2: App related modules.
var hookJWTStrategy = require('./services/passportStrategy');

// 3: Initializations.
var app = express();

// 4: Parse as urlencoded and json.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 5: Hook up the HTTP logger.
app.use(morgan('dev'));

// 6: Hook up Passport.
app.use(passport.initialize());

// Hook the passport JWT strategy.
hookJWTStrategy(passport);

// 7: Set the static files location.
app.use(express.static(__dirname + '../../public'));

// Bundle API routes.
app.use('/api', require('./routes/api')(passport));

// enable the use of CORS
app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(8081, function () {
  console.log('CORS-enabled web server listening on port 8081')
})

// Catch all route.
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '../../public/app/views/index.html'));
});

// 9: Start the server.
app.listen('8080', function() {
    console.log('Magic happens at http://localhost:8080/! We are all now doomed!');
});
