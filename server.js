
var express = require('express')
var path = require('path')
var compression = require('compression')

//Used for database connection
var Sequelize = require('sequelize');
var connection = new Sequelize('skeleton_db', 'root', 'password', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

connection.authenticate().then(function(err){
  if(err){
    console.log('Connection ERROR');
  } else{
    console.log('Connection SUCCESS');
  }
}).catch(function(err){
  console.log("Unable to connect to the database", err);
});

connection.sync().then(function(){
  var tempModels = require('./app/ModelInitializer.js')(connection, Sequelize);
  tempModels.ExampleModel.upsert({
    exampleString: "Heyoooo",
    exampleBlob: "Hiyaaaaaa"
  })
});

var models = require('./app/ModelInitializer.js')(connection, Sequelize);

var app = express()
const isDeveloping = process.env.NODE_ENV !== 'production';

app.use(compression())

app.get('/api/data', function(req, res){
  models.ExampleModel.findOne().then(function(result){
    res.json({
      "message" : result.exampleString
    })
  })
})

//Example Sequelize code
/*app.get('/', function(req, res){
  connection.sync().then(function(){
    connection.query('\
      SELECT parent.* \
      FROM homepagertes as parent \
      INNER JOIN( \
        SELECT contentKey, MAX(createdAt) as latestCreatedAt \
        FROM homepagertes \
        GROUP BY contentKey \
      ) as child \
      ON parent.contentKey = child.contentKey AND parent.createdAt = child.latestCreatedAt \
    ', { model: models.HomepageRTE })
    .then(function(contents){
      var rteContent = [];
      contents.forEach(function(e){
        rteContent[e.dataValues.contentKey] = e.dataValues.content;
      });
      res.render('home', {rteContents: rteContent});
    });
  });

});
*/
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
/*  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'public/index.html')));
    res.end();
  });*/
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

