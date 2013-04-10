var fs = require('fs');
var logFile = './record.log';
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

function getDate() {
return (new Date()).Format("yyyy-M-d h:m:s");
}
exports.log = function(str) {
  str = str + ' at ' +  getDate();
  console.log(str);
  fs.appendFile(logFile, str + '\n', function (err) {
	  if (err)
	    console.log('写入文件出错');
});
}

function getLog() {
  return fs.readFileSync(logFile);
}
exports.show = function(req, res) {
	res.render('log', { log: getLog()});
}
