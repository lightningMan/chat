$(function(){
	var table = $('<div>');
	for (var i = 0; i < 5; ++i) {
		var tr = $('<div>');
		for(var j = 0; j < 20; ++j) {
			var td = $('<a>');
			td.addClass('sprite-' + (i*20+j+1)).addClass('sprite').addClass('j-click-toggle').attr('toggle-target', '#j-chat-qq-face').attr('data-sprite-class', 'sprite sprite-'+(i*20+j+1) + ' no-border');
			td.appendTo(tr);
		}
		tr.appendTo(table);
	}
	table.appendTo($('#j-chat-qq-face'));
})
