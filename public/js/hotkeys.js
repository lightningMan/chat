/**
 * 将聊天框里面的内容追加到聊天对话框里面
 */
function appendMessageUI() {
		var chatEditArea = $('#j-chat-edit-area');
		var messageHtml = $.trim(chatEditArea.html());
		//TODO 写一个过滤函数
		if (messageHtml == '') {
			return;
		}

		var messageTemplateKefu = $('#j-message-template-kefu').clone();
		messageTemplateKefu.find('.chat-message-item-time').html('2014-12-11 11:11');
		messageTemplateKefu.find('.chat-message-item-content').html(messageHtml);
		$('#j-chat-message-list').append(messageTemplateKefu.html());
		$('#j-chat-body').scrollTop(999999999,0)
		chatEditArea.html('');

}




$(function(){
	/**
	 * 发送消息，将消息追加到聊天输入框
	 **/
	$('#j-chat-edit-area').bind('keydown', 'return',function (evt){ 
		appendMessageUI();
		return false; 
	});

	$(document).bind('keydown', 'Ctrl+f',function (evt){ 
		$('#j-search-commonly-used-terms').focus();
		return false; 
	});

	/**
	 * 监听常用术语输入框
	 */
	$('#j-search-commonly-used-terms').bind('input propertychange',function() {
		var _this = $(this);
		var keys = _this.val();
		$('.commonly-used-terms-second-type li').each(function() {
			keys = $.trim(keys);
			var li = $(this);
			if (keys == '') {
				li.hide();
				return;
			}

			var itemText = li.text();
			var keyList = keys.split(' ');
			for (var i in keyList) {
				var key = keyList[i];
				if (itemText.indexOf(key) != -1) {
					li.show();
					break;
				} else {
				    li.hide();
				}
			}
		});
	

	    /*设置箭头的正确方向*/	
		$('.commonly-used-terms-first-type>li').each(function(index) {
			var _this = $(this);
			var arrow = _this.find('h3 a');
			arrow.addClass('toggle-hide').removeClass('toggle-show');
			_this.find('li').each(function() {
				if ($(this).css('display') != 'none') {
					arrow.addClass('toggle-show').removeClass('toggle-hide');
				}
			});
		});

	});



})
function userIn(user) {
	var chatListItemCurrentUser = $('#j-chat-list-item-current-user').clone();
	chatListItemCurrentUser.find('.user-info strong').html(user.nickName + '['+user.from+']');
	chatListItemCurrentUser.find('.user-head').attr('src', user.head);
	$('#j-chat-list-current-user').prepend(chatListItemCurrentUser.html());
}
var user = {
	head: "/img/default-head.png",
	nickName: '西风破',
	from: 'UFO'
}
function messageIn(message) {
		var messageTemplateUser = $('#j-message-template-user').clone();
		messageTemplateUser.find('.chat-message-item-time').html('2014-11-19 12:09');
		messageTemplateUser.find('.chat-message-item-face').attr('src', message.head);
		messageTemplateUser.find('.chat-message-item-content').html(message.content);
		$('#j-chat-message-list').append(messageTemplateUser.html());
		$('#j-chat-body').scrollTop(999999999,0)
}
var message = {
	head: "/img/default-head.png",
	content: new Date()
}
