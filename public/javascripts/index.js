$(function() {
	var cpp_src = '#include <stdio.h>\n#include <iostream>\nusing namespace std;\n\nint main()\n{\n  freopen("cppsrc/1.in", "r", stdin);\n\n  //write you code here\n  cout << "hello world" << endl;\n}\n'
	require.config({
		paths: {
			ace: "lib/ace"
		}
	});

var editor;
require(["ace/ace"], function (ace) {
	editor = ace.edit("editor");
	editor.setTheme("ace/theme/monokai");
	editor.getSession().setMode("ace/mode/c_cpp");
	require(["ace/keyboard/vim"], function(vim) {
		editor.setKeyboardHandler(vim.handler);
	});
	//设置文件内容
	editor.getSession().setValue(cpp_src);
});
$('#btn_click').click(function() {
	var output = $('#outputArea .result');
	var input = $('#inputArea textarea');
	output.text('正在运行...');
	var src = editor.getSession().getValue();
	var inData = input.val();
	var data = {
		src: src,
	inData: inData
	};
	$.post('/test', data, function(res) {
		output.html(res.result);
	});
});
//设置主题
$('#themeSelect select').change(function() {
	editor.setTheme($(this).val());
});
//设置键盘绑定
$('#keybingsSelect select').change(function() {
	if ($(this).val() == "null") {
		editor.setKeyboardHandler(null);
	} else {
		require([$(this).val()], function(o) {
			editor.setKeyboardHandler(o.handler);

		});
	}
});
});
