define(['jquery','template','util'],function ($, template, util) {
    /* 设置菜单选中样式 */
    util.setMenu('/course/course_add');
    /* 获取cs_id */
    csId=util.qs('cs_id');
    /* 获取状态位 */
    var flag = util.qs('flag');
    /* 根据id调用数据 */
    $.ajax({
        type:'get',
        url:'/api/course/basic',
        dataType:'json',
        data:{cs_id:csId},
        success:function (data) {
            if(flag){
                data.result.operate = '编辑课程';
            }else{
                data.result.operate = '添加课程';
            }
            console.log(data);
        //    分析数据，渲染页面
            var html = template('courseBasicTpl',data.result);
            $('#courseBasicInfo').html(html);
        }
    });

});
