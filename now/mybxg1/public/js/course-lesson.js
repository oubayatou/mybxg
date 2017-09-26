define(['jquery','template','util'],function ($,template,util) {
    /* 设置菜单项的选中效果 */
    util.setMenu('/course/course_add');
    var csId = util.qs('cs_id');
    /* 获取数据 */
    $.ajax({
        type: 'get',
        url: '/api/course/lesson',
        data:{cs_id:csId},
        dataType:'json',
        success:function (data) {
            // console.log(data);
            /* 解析数据渲染页面 */
            if(data.code==200){
                var html = template('lessonTpl',data.result);
                $('#lessonInfo').html(html);
            }
        }
    });
});
