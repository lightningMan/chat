var config = require('./config');
var db = require('./dao/codeDao');
db.disconnect(function() {
  console.log('数据库断开连接!');
});
db.connect(function(err){
	if (err) {
		console.log('数据库连接失败!');
	}
	else console.log('数据库连接成功!');
});

var src = '1new src';
var input = 'new input';
var id = urlTool.get(src+input);

db.addCode(id, src, input, function(err, doc) {
	if (err)
	console.log('已经插入此段代码了');
	else
	console.log('插入代码成功!')
})
db.findCodeById('UJJrAv', function(err, doc) {
  console.log(doc.src);
});
