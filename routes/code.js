var urlTool = require('../tools/getShortUrl');
var ipTool = require('../tools/ipTool');

var config = require('../config');
var db = require('../dao/codeDao');

exports.save = function (req, res) {
	var  src = req.body.src;
	var  input = req.body.input;
	var id = urlTool.get(src+input);
	ipTool.logShareCode(req);
	if (src) {
		db.addCode(id, src, input, function(err, doc) {
			if (!err) {
			  res.send({success: 1, msg:'成功插入链接', id: doc.id});
			} else{
			res.send({success: -1, msg: '保存源码失败,已经存在此源码'});
			}
		})
	} else
	{
	  res.send({success: -1, msg: '代码不合法'});
	}
};
exports.show = function(req, res) {
	var id = req.params['id'];
	console.log('id: ' + id);
	db.findCodeById(id, function(err, doc) {
		if (doc == null)
		res.render('index', {title: '在线编译'});
		else
		res.render('index', {title: '在线编译', src: doc.src, input: doc.input});
	//console.log(doc.src);
	  //res.send(doc.src);
	})
};
