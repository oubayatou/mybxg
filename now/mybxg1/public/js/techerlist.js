define(['jquery','template'],function ($,template) {
    /* 调取后台接口获取数据 */
    $.ajax({
        type: 'get',
        url: '/api/teacher',
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            /* 渲染数据 */
            var teacherTpl = template('teacherTpl',{list:data.result});
            $('#teacherInfo').html(teacherTpl);
        }
    });
});

