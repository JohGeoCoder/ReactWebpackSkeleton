var express = require('express')
var path = require('path')
var compression = require('compression')
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

var app = express()
const isDeveloping = process.env.NODE_ENV !== 'production';

app.use(compression())

app.get('/api/data', function(req, res){
  res.json({
    "message" : "Hello, World!"
  })
})

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
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
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  app.use(express.static(path.join(__dirname, 'dist')));

  // send all requests to index.html so browserHistory works
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
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
