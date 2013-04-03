var exec = require('child_process').exec;
var fs = require('fs');
/*
 * GET home page.
 */

function compile(srcFile, exeFile) {
	return 'g++ ' + srcFile +' -o '+ exeFile;
}


exports.index = function(req, res){
	//res.render('index', { title: 'Express' });
	//res.send('hello world!');
	//写入文件
	var content = req.body.content;
	var srcFile = './cppsrc/1.cc';
	var exeFile = './cppsrc/1.out';
	fs.writeFile(srcFile, content, 'utf-8', function (err) {	
		exec(compile(srcFile, exeFile), function(error, stdout, stderr) {
			if (error) {
				res.send({result: stderr});
			} else {
				exec(exeFile, function(error, stdout, stderr) {
					res.send({result: stdout});
				});
			}
		});
	});

	//res.send({name: req.body.name + ' is successed!'});
};
