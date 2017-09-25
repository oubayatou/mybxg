define(['jquery','template','util','form'],function ($,template,util) {
    /* 设置菜单选中时样式 */
    util.setMenu('/course/course_add');
//  绑定事件，点击提交
    $("#courseBtn").click(function () {
        $('#courseForm').ajaxSubmit({
            type: 'post',
            url: '/api/course/create',
            dataType:'json',
            success:function (data) {
                console.log(data);
                if(data.code==200){
                    location.href='/course/basic?cs_id='+data.result.cs_id;
                }
            }
        });
    });
});
