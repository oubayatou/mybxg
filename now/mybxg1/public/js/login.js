define(['jquery','cookie'],function ($) {
    /* 点击登录按钮 ，发送数据，发送成功则跳转至首页 */
    $("#loginBtn").click(function () {

        console.log($("#loginForm").serialize());
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $("#loginForm").serialize(),
            dataType: 'json',
            success: function (data) {
                //console.log(data)
                if (data.code == 200) {
                    /* 利用session的可以跨页面传递的属性 来将登录页面的信息存储，传递到首页 */
                    $.cookie('loginInfo',JSON.stringify(data.result),{path:'/'});
                    location.href = '/main/index';
                }
            }
        });
        return false;//阻止默认行为
    });
});
