var config = {};
//config.server = location.protocol + '//' + location.host;
config.server = 'http://anquangu.3tichina.com:80/safevalley/api/';

config.getProductAndRecord = config.server + 'getProductAndRecord';
config.getProductAndRecord2 = config.server + 'getProductAndRecord2';


//问题详情
config.questionDetailsList = config.server + 'questionDetailsList';

//柱状图
config.addMyFollow = config.server + 'addMyFollow';
config.cancelMyFollow = config.server + 'cancelMyFollow';


config.findQuotationList = config.server + 'findQuotationList';
config.getMyFollowList = config.server + 'getMyFollowList';
config.getQuotationByProductId = config.server + 'getQuotationByProductId';






//  写进一个cookie 测试
function setCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
setCookie("openId", "otuBSwKR-RhIjxxD2Oq3HeuUXNcU");

//获取cookies中的值
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}
var openId = getCookie("openId");









 