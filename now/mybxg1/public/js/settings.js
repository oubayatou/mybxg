define(['jquery','template'],function ($,template) {
//    调用接口，获取个人信息
    /* 根据sessionid查询当前用户 */
    $.ajax({
        url: '/api/teacher/profile',
        type:'get',
        dataType:'json',
        success:function (data) {
            // console.log(data);
            /* 解析数据 渲染页面 */
            if(data.code==200){
                var html = template('settingsTpl',data.result);
                $('#settingsInfo').html(html);
            }
        }
    });
});
