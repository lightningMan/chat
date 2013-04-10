var exec = require('child_process').exec;
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: '在线编译' });
	//res.send('hello world!');
	//exec('g++ ./cppsrc/1.cc -o ./cppsrc/1.out', function(error, stdout, stderr) {
		//exec('./cppsrc/1.out', function(error, stdout, stderr) {
			//res.send(stdout);
		//});
	//});
	//res.send("hello wored!");
};
