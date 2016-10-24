
var express = require('express')
var path = require('path')
var compression = require('compression')
var bodyParser = require('body-parser')
var passport = require('passport')
var app = express()
var session = require('client-sessions')
var Sequelize = require('sequelize');

//Database connection and models.
var connection = require('./app/DatabaseInitializer.js')(Sequelize);
var models = require('./app/ModelInitializer.js')(connection, Sequelize);

//Example Data
/*models.ExampleModel.upsert({
  exampleString: "Heyoooo",
  exampleBlob: "Hiyaaaaaa"
})*/

app.use(bodyParser.json())

//http://www.codingscripts.com/using-database-to-handle-session-in-node-js/
app.use(session({
  cookieName: 'ProjectNameCookie',
  secret: 'SecretCookieString',
  duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms 
  activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
  cookie: {
    path: '/api', // cookie will only be sent to requests under '/api' 
    maxAge: 60000, // duration of the cookie in milliseconds, defaults to duration above 
    ephemeral: false, // when true, cookie expires when the browser closes 
    httpOnly: true, // when true, cookie is not accessible from javascript 
    secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process 
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(compression())

require('./app/Passport.js')(passport, models);

require('./app/APIInitializer.js')(app, models, passport);

const isDeveloping = process.env.NODE_ENV !== 'production';

if (isDeveloping) {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const webpackConfig = require('./webpack.config.js');
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
} else {
  app.use(express.static(path.join(__dirname, 'public')));

  // send all requests to index.html so browserHistory works
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  if(isDeveloping)
  {
    console.log('Development Express server running at localhost:' + PORT)
  } else{
    console.log('Production Express server running at localhost:' + PORT)
  }
})

