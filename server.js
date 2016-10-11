
var express = require('express')
var path = require('path')
var compression = require('compression')
var app = express()
var Sequelize = require('sequelize');

//Database connection and models.
var connection = require('./app/DatabaseInitializer.js')(Sequelize);
var models = require('./app/ModelInitializer.js')(connection, Sequelize);

//Example Data
/*models.ExampleModel.upsert({
  exampleString: "Heyoooo",
  exampleBlob: "Hiyaaaaaa"
})*/

require('./app/APIInitializer.js')(app, models);

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

app.use(compression())

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  if(isDeveloping)
  {
    console.log('Development Express server running at localhost:' + PORT)
  } else{
    console.log('Production Express server running at localhost:' + PORT)
  }
})

