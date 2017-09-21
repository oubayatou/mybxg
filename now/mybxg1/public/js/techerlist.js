define(['jquery','template','bootstrap'],function ($,template) {
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
            $('.eod').on('click',function () {
                var that = this;
                /* 获取改行的td */
                var td = $(this).closest('td');
                var tcId = td.attr('data-tId');
                var tcStatus = td.attr('data-status');
                console.log(tcId,tcStatus);
                /* 启用和注销功能 */
                $.ajax({
                    url: '/api/teacher/handle',
                    type:'post',
                    data:{tc_id:tcId,tc_status:tcStatus},
                    dataType: 'json',
                    success: function (data) {
                        if(data.code == 200){
                            td.attr('data-status',data.result.tc_status);
                            if(data.result.tc_status == 1){
                                $(that).text('注 销');
                            }else{
                                $(that).text('启 用');
                            }
                        }
                    }
                });
            });
            /* 查看讲师 */
            $('.preview').on('click',function () {
                var td = $(this).closest('td');
                var tcId = td.attr('data-tId');
                $.ajax({
                    type: 'get',
                    url: '/api/teacher/view',
                    data: {tc_id:tcId},
                    dataType:'json',
                    success: function (data) {
                        console.log(data);
                        var html = template('modalTpl',data.result);
                        $('#modalInfo').html(html)
                        /* 显示弹出窗 */
                        $('#teacherModal').modal();
                        /* bootrap的modal是bootstrap的js中的方法，而且依赖于jquery */

                    }
                });
            });
        }
    });
});

