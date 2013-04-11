exports.compile = function compile(srcFile, exeFile) {
	return 'g++ ' + srcFile +' -o '+ exeFile;
}

exports.exe = function(exeFile, input) {
  return exeFile + ' < ' + input;
}
exports.rm = function rm(file) {
	return 'rm -rf ' + file;
}
