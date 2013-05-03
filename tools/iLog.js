var db = require('../dao/codeDao');
var fs = require('fs');
var iDate = require('../tools/iDate');
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


exports.log = function(str) {
  str = str + ' at ' +  iDate.getDateString();
  console.log(str);
  db.simpleLog(str, function(err, doc) {
    console.log('插入日志成功: ' + doc.id);
  })
};

exports.show = function(req, res) {
	db.findAllLog(function(err, docs) {
		res.render('log', { logs: docs});
	});
}
