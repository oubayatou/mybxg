define(['jquery','template','util'],function ($,template,util) {
    /* 设置菜单的选中展开 */
    util.setMenu(location.pathname);
    /* 解析数据 渲染页面 */
    $.ajax({
        type: 'get',
        url:'/api/course',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            for (var i = 0;i < data.result.length;i++){
                var $coverStr = data.result[i].cs_cover;
                var n=$coverStr.indexOf('?');
                data.result[i].coverImg=$coverStr.substring(0,n);
            }

            var html = template('courseListTpl',{list:data.result});
            $('#courseInfo').html(html);
        }
    });
});
