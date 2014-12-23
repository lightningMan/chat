$(function(){
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var headerHeight = $('header').height();
	var leftBarWidth = $('#j-sidebar-left').width();
	var rightBarWidth = $('#j-sidebar-right').width();

	/*用.css(width,'100px')渲染出来的总宽度包括padding*/
	/*用.width(100)渲染出来的总宽度不包括padding*/
	$('#j-main-body')
		.width(windowWidth - leftBarWidth - rightBarWidth-60)
	    .height(windowHeight - headerHeight);

	$('#j-chat-body').height($('#j-main-body-container').height() - $('#j-chat-header').height() - $('#j-chat-footer').height() -40)
	/*这里减掉的20px是padding*/
	$('#j-sidebar-right').height(windowHeight - 20);
$('.j-history-message').height(windowHeight - $('#j-tablist').height()-30);


/**
 * 给某个元素绑定click-toggle 事件，可以对toggle-target的的元素进行toggle
 * 该元素如果是触发显示事件，那么就加上toggle-show类，否则加上toggle-hide类
 *
 *
 */
$(document).delegate('.click-toggle', 'click', function(){
	var _this = $(this);
	var selector = _this.attr('toggle-target');
	if ($(selector).css('display') == 'none') {
		_this.removeClass('toggle-hide').addClass('toggle-show');
	} else {
		_this.addClass('toggle-hide').removeClass('toggle-show');
	}
	$(selector).slideToggle(300);
});

$(document).delegate('.click-hide', 'click', function(){
	var _this = $(this);
	var selector = _this.attr('hide-target');
	$(selector).slideUp(500);
});





})
