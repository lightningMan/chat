
/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, test = require('./routes/test')
, code = require('./routes/code')
, http = require('http')
, path = require('path')
, db = require('./dao/codeDao')
, iLog = require('./tools/iLog');

var app =  module.exports = express();

app.configure(function(){
	//app.set('port', 1337|process.env.PORT);
	app.set('port', 1337);
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

app.configure('product', function(){
	app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/test', test.index);
app.post('/code', code.save);
app.get('/log', iLog.show);
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


var server = http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});


//chat相关代码
//var WebSocketServer = require('ws').Server;
//console.log(require('util').inspect(WebSocketServer));
//var wss = new WebSocketServer({server : server});
//var colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];
//colors.sort(function(a,b) { return Math.random() > 0.5; } );
//var clients = [];

//wss.on('connection', function(ws){
	//clients.push(ws);
	//var userName = false;
	//var userColor = false;
	//ws.on('message', function(msg){
		//if(!userName){
			//userName = msg;
			//userColor = colors.shift();
			//ws.send(JSON.stringify({ type:'color', data: userColor }));
			//console.log(userName + ' login');
		//}else{
			//console.log(userName + ' say: ' + msg);
			//var obj = {
				//time: (new Date()).getTime(),
		//text: msg,
		//author: userName,
		//color: userColor
			//};
			//var json = JSON.stringify({type:'message', data: obj});
			//for (var i=0; i < clients.length; i++) {
				//console.log(clients.length);
				//clients[i].send(json);
			//}
		//}
	//});
	//ws.on('close', function(){
		//if(userName !== false && userColor != false){
			//var index = clients.indexOf(ws);
			//clients.splice(index, 1);
			//colors.push(userColor);
		//}  
	//});
//});
