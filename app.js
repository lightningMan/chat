//引入用到的模块
var express = require('express')
, http = require('http')
, path = require('path');

var app =  module.exports = express();

app.configure(function(){
	// 设置服务器
	app.set('port', 8888);
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);

	//设置css和js模板引擎
	app.use(require('stylus').middleware(__dirname + '/public'));
	app.use(express.static(path.join(__dirname, 'public')));
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
});


//定义路由
app.get('/', function(req, res){
	res.render('index', { title: '在线客服' });
});


var server = http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});

