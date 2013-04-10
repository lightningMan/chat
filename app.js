
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , test = require('./routes/test')
  , code = require('./routes/code')
  , http = require('http')
  , path = require('path')
  , db = require('./dao/codeDao');

var app =  module.exports = express();

app.configure(function(){
  app.set('port', process.env.PORT || 81);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/test', test.index);
app.post('/code', code.save);
app.get('/:id', code.show);


//数据库连接
db.connect(function(error){
	if (error) console.log('数据库连接失败!')
	else console.log('数据库已连接!');
});
app.on('close', function(errno) {
	db.disconnect(function(err) {
	  if (!err) {
		console.log('数据库连接关闭!');
	  }
	});
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

