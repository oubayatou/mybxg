define(['jquery','template','cookie'],function ($,template) {
	// NProgress.start();
	// NProgress.done();
	//控制左侧菜单的折叠和展开功能
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});
	/* 实现退出功能 */
	$('#logoutBtn').on('click',function () {
		//alert(12);
		$.ajax({
			url: '/api/logout',
			type: 'post',
			dataType: 'json',
			success: function (data) {
				//console.log(data);
				if(data.code == 200){
					location.href = '/main/login';
				}
			}
		});
	});
	/* 验证用户是否登录 */
	var flag = $.cookie('PHPSESSID');
	//console.log(flag);
	if(!flag && location.pathname != '/main/login'){
		location.href = '/main/login';
	}
	var loginInfo = $.cookie('loginInfo');
	//console.log(loginInfo);
	// 将loginInfo转换为对象 先判断是否存在 ，否则会出错
	loginInfo = loginInfo && JSON.parse(loginInfo);
	/* 填充头像信息 */
	var tpl = '<div class="avatar img-circle"><img src="{{tc_avatar}}"></div><h4>{{tc_name}}</h4>';
	var html = template.render(tpl,loginInfo);
	$('.aside .profile').html(html);
	/*$('.aside .profile img').attr('src',loginInfo.tc_avatar);
	$('.aside .profile h4').html(loginInfo.tc_name);*/
});


	