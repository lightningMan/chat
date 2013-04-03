$(function() {


	var editor = ace.edit("editor");

	//editor.setTheme("ace/theme/monokai");
	//editor.getSession().setMode("ace/mode/c_cpp");
	editor.setFontSize("16px");



	$('#btn_click').click(function() {
		var output = $('#output .result');
		output.text('正在运行...');
		var content = editor.getSession().getValue();
		var data = {content: content};
		$.post('/test', data, function(res) {
			output.html(res.result);
		});
	});
})
