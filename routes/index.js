/*
 * 获得首页地址
 */
exports.index = function(req, res){
	res.render('index', { title: '在线编译' });
};
