template.config('openTag', '<!--[');
template.config('closeTag', ']-->');



// 模板帮助方法，绝对化图片地址
//时间戳转换成年月日
template.helper('$formatDate', function(timestamp, format) { 
    date = new Date(parseInt(timestamp) * 1000);  //转换数据类型  如果时间戳是后端生成 要 * 1000
    var map = {
        "M": date.getMonth() + 1, //月份 
        "d": date.getDate(), //日 
        "h": date.getHours(), //小时 
        "m": date.getMinutes(), //分 
        "s": date.getSeconds(), //秒 
        "q": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
        var v = map[t];
        if(v !== undefined){
            if(all.length > 1){
                v = '0' + v;
                v = v.substr(v.length-2);
            }
            return v;
        }
        else if(t === 'y'){
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;

});
