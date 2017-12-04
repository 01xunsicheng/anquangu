//保留两位小数
template.helper('dec2', function(data) {
	return data.toFixed(2);
});
//判断当前浏览器的版本是否为ie8
function isIE8() {
	if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0") {
		return true;
	} else {
		return false;
	}
}

//获取cookies中的值
function getCookie(cookieName) {
	var ecookieName = helper.mencode(cookieName);
	var strCookie = document.cookie;
	var arrCookie = strCookie.split("; ");
	for(var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		if(ecookieName == arr[0]) {
			return helper.mdecode(arr[1]);
		}
	}
	return "";
}
//获取url中的参数

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return unescape(r[2]);
	return null; //返回参数值
}

//溯源
function getProductAndRecord(productId,qrId) {
	var postData = {
		'orderId': productId,
		'qrId':qrId
	};
	$.ajax({
		'type': 'post',
		'dataType': 'json',
		'data': postData,
		'url': config.getProductAndRecord,
		'success': function(data) {
			if(data.code == 1) {
				var data = {
					info: data.object,
					list: data.object.details
				};
				mui.previewImage();
				var html = template('suyuan-tmpl', data);
				$('#suyuan').html(html);

			} else {
				mui.toast(data.message);
			};
		}
	});
};

//分享溯源
function getProductAndRecord2(productId) {
	var postData = {
		'productId': productId
	};
	$.ajax({
		'type': 'post',
		'dataType': 'json',
		'data': postData,
		'url': config.getProductAndRecord2,
		'success': function(data) {
			if(data.code == 1) {
				var data = {
					info: data.object,
					list: data.object.details
				};
				mui.previewImage();
				var html = template('suyuan-tmpl', data);
				$('#suyuan').html(html);

			} else {
				mui.toast(data.message);
			};
		}
	});
};

//问题详情
function questionDetailsList(questionId, pageIndex, pageSize) {
	var postData = {
		'questionId': questionId,
		'pageIndex': pageIndex,
		'pageSize': pageSize
	};
	$.ajax({
		'type': 'post',
		'dataType': 'json',
		'data': postData,
		'url': config.questionDetailsList,
		'success': function(data) {
			if(data.code == 1) {
				var data = {
					info: data.object,
					list: data.object.answerList.content
				};
				mui.previewImage();
				var html = template('questionDetail-tmpl', data);
				$('#questionDetail').html(html);

			} else {
				mui.toast(data.message);
			};
		}
	});
};

//柱状图
function getQuotationByProductId(productId) {
	var postData = {
		'productId': productId
	};
	$.ajax({
		'type': 'post',
		'dataType': 'json',
		'data': postData,
		'url': config.getQuotationByProductId,
		'success': function(data) {
			if(data.code == 1) {
				//console.log(data.object.quotationData.length);
				if(data.object.quotationData) {
					var data = {
						unit: data.object.unit,
						quotationData: data.object.quotationData,
					};

					var unit = data.unit;
					var myplace = [];
					var myprice = [];
					if(data.quotationData.length == 0) {
						myplace = ["", ""];
						myprice = ["", ""];
						mui.toast("数据更新中...");
					} else if(data.quotationData.length == 1) {
						for(x in data.quotationData) {
							myplace.push(data.quotationData[x].place);
							myprice.push(data.quotationData[x].price);

						}
						myplace.push("");
						myplace.push("");
					} else {
						for(x in data.quotationData) {
							myplace.push(data.quotationData[x].place);
							myprice.push(data.quotationData[x].price);

						}
					}

					//					var num = data.quotationData.length;
					//					var num_width = num * 35;

					//					$("#main").css({
					//						"width": num_width + 'px',
					//						'height':'400px',
					//						"min-width": "360px"
					//					});
					//	柱状代码开始
					var myChart = echarts.init(document.getElementById('main'));
					option = {
						color: ['#fff'],
						//						tooltip: {
						//
						//							trigger: 'axis',
						//							axisPointer: { // 坐标轴指示器，坐标轴触发有效
						//								type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						//							}
						//
						//						},
						legend: {
							data: ['价格'],
							show: false,

						},
						grid: {
							left: '10px',
							right: '10px',
							bottom: '20px',
							containLabel: true
						},
						xAxis: [{
							type: 'category',
							data: myplace,

							axisTick: {
								show: false
							},

							axisLine: {
								show: true,
								lineStyle: {
									color: '#fff'

								}
							},

							axisLabel: {
								interval: 0,
								inside: false,
								//							rotate:-90,
								formatter: function(value, index) {
//									console.log(value);
									var _tempChart = '';
									for(var i = 0; i < value.length; i++) {
										_tempChart += value[i] + '\n';
									}
									return _tempChart;
								},
								textStyle: {
									color: '#fff'
								}
							},

						}],
						yAxis: [{
							type: 'value',
							name: "价格:" + unit,
							nameTextStyle: {
								color: '#fff'
							},
							axisTick: {
								show: false
							},
							splitLine: {
								lineStyle: {
									type: 'dotted'
								}
							},
							boundaryGap: ['0', '10%'],
							axisLabel: {
								textStyle: {
									color: '#fff'
								}
							},
							axisLine: {
								show: true,
								lineStyle: {
									color: '#fff'
								}

							},

						}],
						dataZoom: [{
							id: 'dataZoomX',
							type: 'slider',
							xAxisIndex: [0],
							filterMode: 'filter',
							show: true,
							handleSize: '100%',
							showDetail: false,
							startValue: 0,
							endValue: 8,
							zoomLock: true,
							bottom: '0%'
						}],

						series: [{
							name: '价格',
							type: 'bar',
							barWidth: '50%',
							barMaxWidth: '20px',
							data: myprice,
							edgeSymbol: 'arrow',
							label: {
								normal: {
									show: true,
									position: 'top'
								}
							},
						}],
						animation: false,

					};

					myChart.setOption(option);
					//柱状代码结束

				} else {
					mui.toast(data.message);
				}

			} else {
				mui.toast(data.message);
			};
		}
	});
};