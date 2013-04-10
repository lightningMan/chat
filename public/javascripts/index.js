$(function() {
	var cpp_src = '#include <stdio.h>\n#include <iostream>\nusing namespace std;\n\nint main()\n{\n  freopen("cppsrc/1.in", "r", stdin);\n\n  // 在这里书写你的代码\n  cout << "hello world" << endl;\n}\n'
	require.config({
		paths: {
			ace: "lib/ace"
		}
	});

function run() {
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
}
function share() {
	var output = $('#outputArea .result');
	var input = $('#inputArea textarea');
	output.text('正在运行...');
	var src = editor.getSession().getValue();
	var inData = input.val();
	var data = {
		src: src,
input: inData
	};
	$.post('/code', data, function(res) {
		if (res.success == 1) {
		  $('.result').html('保存成功\n您的代码地址为: ' + location.host + '/' + res.id);
		} else {
		  $('.result').html('保存失败\n' + res.msg);
		}
	});

}
var editor;
require(["ace/ace"], function (ace) {
	editor = ace.edit("editor");
	editor.getSession().setMode("ace/mode/c_cpp");
	if ($('#hideSrc')) {
	editor.getSession().setValue($('#hideSrc').text());
	
	} else {
	editor.getSession().setValue(cpp_src);

	editor.gotoLine(10, 100, false);
	}
	editor.focus();

	editor.commands.addCommands([{
		name: "run",
		bindKey: {win: "Ctrl-Return", mac: "Command-Return"},
		exec: function() {
			run();
		}
	}]);
});
$('#btn_click').click(function() {
	run();
});
$('#btn_share').click(function() {
	share();
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
//设置字体大小
$('#fontSizeSelect select').change(function() {
  editor.setFontSize($(this).val());
});

// 设置字体样式
function setFont(o, fontStyle) {
	o.css({'font-family': fontStyle});
}
var $editor = $('#editor');
$('#fontStyleSelect select').change(function() {
	setFont($editor, $(this).val());
});
});
