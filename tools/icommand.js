exports.compile = function compile(srcFile, exeFile) {
	return 'g++ ' + srcFile +' -o '+ exeFile;
}
exports.rm = function rm(file) {
	return 'rm -rf ' + file;
}
