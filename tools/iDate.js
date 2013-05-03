var getDateObj = exports.getDateObj = function getDateObj() {
  var d = new Date(); //创建一个Date对象
  var localTime = d.getTime();
  var localOffset=d.getTimezoneOffset()*60000; //获得当地时间偏移的毫秒数
  var utc = localTime + localOffset; //utc即GMT时间
  var offset = 8; //以中国时间为例，东8区
  var cn = utc + (3600000*offset);
  return new Date(cn);
}

exports.getDateString = function getDateString() {
	return getDateObj().Format("yyyy-M-d h:m:s");
}
