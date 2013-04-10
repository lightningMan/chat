var iLog = require('./iLog');
var getClientIP = function(req){
	var ipAddress;
	var headers = req.headers;
	var forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
	forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
	if (!ipAddress) {
		ipAddress = req.connection.remoteAddress;
	}
	return ipAddress;
}

exports.logShareCode = function(req) {
 var ip = getClientIP(req);
 iLog.log('[Share Code]: ' + ip);
}
exports.logRunCode = function(req) {
 var ip = getClientIP(req);
 iLog.log('[Run Code]: ' + ip);
}
