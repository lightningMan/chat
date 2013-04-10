exports.get = function(str) {
  var hash = require('crypto').createHash('md5');
  var md5 = hash.update(str+"").digest('hex');

  var chars = ["a" , "b" , "c" , "d" , "e" , "f" , "g" , "h" ,  
        "i" , "j" , "k" , "l" , "m" , "n" , "o" , "p" ,  
        "q" , "r" , "s" , "t" , "u" , "v" , "w" , "x" ,  
        "y" , "z" , "0" , "1" , "2" , "3" , "4" , "5" ,  
        "6" , "7" , "8" , "9" , "A" , "B" , "C" , "D" ,  
        "E" , "F" , "G" , "H" , "I" , "J" , "K" , "L" ,  
        "M" , "N" , "O" , "P" , "Q" , "R" , "S" , "T" ,  
        "U" , "V" , "W" , "X" , "Y" , "Z" ];
  
        //把加密字符按照8位一组16进制与0x3FFFFFFF进行位与运算   
        var  hexint = 0x3FFFFFFF & parseInt("0x" + md5.substring(8, 16));  
		var outChars = '';
        for  (var j = 0; j < 6; j++)  
        {  
            //把得到的值与0x0000003D进行位与运算，取得字符数组chars索引   
            var index = 0x0000003D & hexint;  
            //把取得的字符相加   
            outChars += chars[index];  
            //每次循环按位右移5位   
            hexint = hexint >> 5;  
        }  
        //把字符串存入对应索引的输出数组   
		return outChars;
}
