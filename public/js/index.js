$(function() {
	var cpp_src = '#include <cstdio>\n#include <iostream>\nusing namespace std;\n\nint main()\n{\n  cout << "hello world" << endl;\n  \n  return 0;\n}\n'
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
	$.post('/compile', data, function(res) {
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
	$.post('/code/save', data, function(res) {
		if (res.success == 1) {
			var address = 'http://127.0.0.1:1337/' + res.id;
			$('.result').html('保存成功\n您的代码地址为:' + '<a target="_blank" href = ' + address + '>'+address + '</a>');
		} else {
			$('.result').html('保存失败\n' + res.msg);
		}
	});

}
var editor;
require(["ace/ace"], function (ace) {
	editor = ace.edit("editor");
	editor.getSession().setMode("ace/mode/c_cpp");
	editor.setTheme("ace/theme/monokai");
	editor.setFontSize("18px");

	if ($('#hideSrc').length > 0) {
		editor.getSession().setValue($('#hideSrc').text());
	} else {
		editor.getSession().setValue(cpp_src);
		editor.gotoLine(8, 2, false);
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


//聊天室相关的监听代码
//$(function () {
//var CHATSTATE = {isLogin: false};
//var content = $('#chat_content');
//var status = $('#chat_status');
//var input = $('#send_area');
//var myColor = false;
//var myName = false;
//var connection;
//function showChat() {
//$('#chat_tip').hide();
//$('#chat_main').show();
//if (CHATSTATE.isLogin == false) {
////connection = new WebSocket('ws://sharecode.cloudfoundry.com:3000');
//connection = new WebSocket('ws://sharecode.cloudfoundry.com:3001');
//connection.onopen = function () {
//status.text('选择一个昵称:');
//};
//connection.onmessage = function (message) {
//var json = JSON.parse(message.data);
//if (json.type === 'color') { // first response from the server with user's color
//myColor = json.data;
//status.text(myName + ': ').css('color', myColor);
//}else if (json.type === 'message') { // it's a single message
//addMessage(json.data.author, json.data.text,
//json.data.color, new Date(json.data.time));
//} 
//};
//CHATSTATE.isLogin = true;
//}
//}

//function hideChat() {
//$('#chat_main').hide();
//$('#chat_tip').show();
//}

//$('#chat_tip').click(showChat);
//$('#chat_close').click(hideChat);


//input.keydown(function(e) {
//if (e.keyCode === 13) {
//var msg = $(this).val();
//if (!msg)    return;
//connection.send(msg);
//$(this).val('');
//if (myName === false) {
//myName = msg;
//}
//}
//});

//function addMessage(author, message, color, dt) {
//content.append('<p><span style="color:' + color + '">' + author + '</span> @ ' +
//+ dt.getHours() + ':'
//+ (dt.getMinutes()<10?('0'+ dt.getMinutes()):dt.getMinutes()) + '----' + message + '</p>');
//}
//});

