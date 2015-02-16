// ----------------------------------------------------------------------------
// Dependencies
// ----------------------------------------------------------------------------

var express = require('express');
var request = require('request');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

// ----------------------------------------------------------------------------
// Configuration
// ----------------------------------------------------------------------------

var PORT = 8080;

var CLIENT_ID = '94d9e5aedbca43fc807eab9c5bbb0c3e';
var CLIENT_SECRET = '3e86f86d7e6f4bec900efd336c860820';
var REDIRECT_URI = 'http://localhost:8080/auth/callback';

var STATE_KEY = 'spotify_auth_state';
var SCOPE = 'user-read-private user-read-email';

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// ----------------------------------------------------------------------------
// Routes
// ----------------------------------------------------------------------------

var app = express();

app.use(express.static(__dirname + '/dist'))
   .use(cookieParser());

app.get('/auth/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(STATE_KEY, state);

  res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPE,
    redirect_uri: REDIRECT_URI,
    state: state
  }));

});

app.get('/auth/callback', function(req, res) {

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[STATE_KEY] : null;

  if (state === null || state !== storedState) {
    res.redirect('/?' + querystring.stringify({
      error: 'state_mismatch'
    }));
  } else {

    res.clearCookie(STATE_KEY);

    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {

      if (!error && response.statusCode === 200) {

        var access_token = body.access_token;
        var refresh_token = body.refresh_token;

        res.redirect('/login?' + querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token
        }));

      } else {

        res.redirect('/?' + querystring.stringify({
          error: 'invalid_token'
        }));

      }

    });

  }

});

app.get('/refresh_token', function(req, res) {

  var refreshToken = req.query.refresh_token;

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var accessToken = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });

});

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

// ----------------------------------------------------------------------------
// Server
// ----------------------------------------------------------------------------

console.log('Server started on port ' + PORT + '…');
app.listen(PORT);