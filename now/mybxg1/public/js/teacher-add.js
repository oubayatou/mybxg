define(['jquery','template','util','datepicker','language'],function ($,template,util) {
    /* 获取url的参数 */
    /* 获取tc_id */
    var tcId = util.qs('tc_id');
    //console.log(tcId);
    /* 根据tc_id判断功能，有id时跳转编辑，没则跳转到添加功能页面 */
    if(tcId){
        // 编辑讲师信息
        $.ajax({
            type: 'get',
            url: '/api/teacher/edit',
            data:{
                tc_id:tcId
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                /* 为返回的 数据添加operate属性，用于改变编辑页面 的信息 */
                data.result.operate = '编辑讲师'
                if(data.code == 200){
                    var html = template('teacherTpl',data.result);
                    $('#teacherInfo').html(html);
                    submitForm('/api/teacher/update');
                    setDatePicker();
                }
            }
        });

    }else {
    //    添加讲师信息
        var html = template('teacherTpl',{operate:'添加讲师'});
        $('#teacherInfo').html(html);
        submitForm('/api/teacher/add');
        setDatePicker();
    }
    function submitForm(url) {
        $('#teacherBtn').click(function () {
            $.ajax({
                type:'post',
                url: url,
                data:$('#teacherForm').serialize(),
                dataType:'json',
                success:function (data) {
                    if(data.code == 200){
                        location.href = '/teacher/list';
                    }
                }
            });
        });
    }
    /* datepicker插件 */
    function setDatePicker() {
        $('#datepicker').datepicker({
            language : 'zh-CN',
            format : 'yyyy-mm-dd'
            //其余属性参考datepicker官网
        });
    }
});
