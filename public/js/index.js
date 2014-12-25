/**
 ** 设置窗体大小，根据显示器分辨率自适应 
 **
 **/
function setWidthAndHeight() {
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var headerHeight = $('header').height();
	var leftBarWidth = $('#j-sidebar-left').width();
	var rightBarWidth = $('#j-sidebar-right').width();

	$('#j-main-container').height(windowHeight - headerHeight);
	/*用.css(width,'100px')渲染出来的总宽度包括padding*/
	/*用.width(100)渲染出来的总宽度不包括padding*/
	$('#j-main-body')
		.width(windowWidth - leftBarWidth - rightBarWidth-60)
	    .height(windowHeight - headerHeight);

	$('#j-chat-body').height($('#j-main-body-container').height() - $('#j-chat-header').height() - $('#j-chat-footer').height() -40);
$('.j-chat-list').height(windowHeight*0.80);
}

function bindEvent() {
	/**
	 * 给某个元素绑定click-toggle 事件，可以对toggle-target的的元素进行toggle
	 * 该元素如果是触发显示事件，那么就加上toggle-show类，否则加上toggle-hide类
	 *
	 */
	$(document).delegate('.j-click-toggle', 'click', function(){
		var _this = $(this);
		var selector = _this.attr('toggle-target');

		if (_this.is('.toggle-hide')) {
			_this.removeClass('toggle-hide').addClass('toggle-show');
		
		$(selector).slideDown(300);
		} else {
			_this.addClass('toggle-hide').removeClass('toggle-show');
		$(selector).slideUp(300);
		}

	});

	$(document).delegate('.j-click-hide', 'click', function(){
		var _this = $(this);
		var selector = _this.attr('hide-target');
		$(selector).slideUp(500);
});


$(document).delegate('.j-click-remove', 'click', function() { 
	var _this = $(this);
	var selector = _this.attr('click-target');
	$(selector).remove();
});

$(document).delegate('.j-click', 'click', function() { 
	var _this = $(this);
	var method = _this.attr('click-target-method');
	eval(method);
});
/*常用术语点击之后append到聊天编辑框*/
$('.commonly-used-terms-second-type a').click(function() {
	var _this = $(this);
	var text = _this.attr('title');
	appendToChatEditArea(text);	
});

$(document).delegate('#j-chat-qq-face a', 'click', function() { 
	var _this = $(this);
	var classNames = _this.attr('data-sprite-class');
	var chatIcon = $('<img />').attr('class', classNames).attr('src', '/img/nothing.png');
	appendToChatEditArea(chatIcon);
	$('#j-i-icon-face').addClass('toggle-hide').removeClass('toggle-show');
});


/*TODO hack实现,换一种方式*/
$(document).delegate('#j-chat-edit-area', 'click', function() { 
	$('#j-i-icon-face').addClass('toggle-hide').removeClass('toggle-show');
});


}

/**
 * 设置截图粘贴功能
 */

function configPasteImage() {
	var chatEditArea = $('#j-chat-edit-area');
	chatEditArea.pastableContenteditable();
	chatEditArea.on('pasteImage', function (ev, data){
		appendToChatEditArea($('<img>').attr('src', data.dataURL).addClass('paste-img'));
		//console.log("dataURL: " + data.dataURL);
		//
		//console.log("width: " + data.width);
		//console.log("height: " + data.height);
		//console.log(data.blob);
	});
}

/**
 * 将dom元素append追加到聊天编辑框
 * 
 * */
function appendToChatEditArea(child) {
	var container = $('#j-chat-edit-area');
	container.append(child);
	$('<input>').appendTo(container).focus().remove();
	container.focus();
}


$(function(){
	setWidthAndHeight();
	bindEvent();
	configPasteImage();
})
