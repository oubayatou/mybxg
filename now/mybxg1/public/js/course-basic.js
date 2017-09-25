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
            //console.log(data);
        //    分析数据，渲染页面
            var html = template('courseBasicTpl',data.result);
            $('#courseBasicInfo').html(html);
            /* 处理二级下拉联动 */
            $('#firstType').change(function () {
            //    获取一级分类id
                var pid = $(this).val();
                /* 根据一级分类的id判断查询相应的所有的二级分类 */
                console.log(pid);
                $.ajax({
                    url: '/api/category/child',
                    type:'get',
                    data: {cg_id:pid},
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        var tpl = '<option value="">请选择二级分类...</option>{{each list}}<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>{{/each}}';
                        var html=template.render(tpl,{list:data.result});
                        $('#secondType').html(html);
                    }
                });
            });
        }
    });

});
