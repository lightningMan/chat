var exec = require('child_process').exec;
var fs = require('fs');
/*
 * GET home page.
 */

function compile(srcFile, exeFile) {
	return 'g++ ' + srcFile +' -o '+ exeFile;
}

function rmFile(file) {
	return 'rm -rf ' + file;
}

exports.index = function(req, res){
	//写入文件
	var src = req.body.src;
	var inData = req.body.inData;
	var srcFile = './cppsrc/1.cc';
	var exeFile = './cppsrc/1.out';
	var inFile = './cppsrc/1.in';
	//处理input的内容
	console.log('inData: ' + inData);
	fs.writeFile(inFile, inData, 'utf-8', function(err) {
		if (!err) {
			fs.writeFile(srcFile, src, 'utf-8', function (err) {
				exec(compile(srcFile, exeFile), function(error, stdout, stderr) {
					if (error) {
						res.send({result: stderr});
					} else {
						exec(exeFile, function(error, stdout, stderr) {
							res.send({result: stdout});
							exec(rmFile(srcFile));
							exec(rmFile(exeFile));
							exec(rmFile(inFile));
						});
					}
				});
			});

		}	
	});

	//res.send({name: req.body.name + ' is successed!'});
};
