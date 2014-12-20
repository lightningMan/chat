$(function(){
	var windowWeight = $(window).width();
	var windowHeight = $(window).height();
	var headerHeight = $('header').height();
	var leftBarWeight = $('#j-sidebar-left').width();
	var rightBarWeight = $('#j-sidebar-right').width();

	$('#j-main-body')
		.width(windowWeight - leftBarWeight - rightBarWeight-60)
	.height(windowHeight - headerHeight);
})
