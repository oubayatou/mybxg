define(['jquery','template','util','datepicker','language','validate','form'],function ($,template,util) {
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
                    setDatePicker();
                    submitForm('/api/teacher/update');
                }
            }
        });

    }else {
    //    添加讲师信息
        var html = template('teacherTpl',{operate:'添加讲师'});
        $('#teacherInfo').html(html);
        setDatePicker();
        submitForm('/api/teacher/add');
    }
    /* datepicker插件 */
    function setDatePicker() {
        $('#datepicker').datepicker({
            language : 'zh-CN',
            format : 'yyyy-mm-dd'
            //其余属性参考datepicker官网
        });
    }
    // function submitForm(url) {
    //     $('#teacherBtn').click(function () {
    //         $.ajax({
    //             type:'post',
    //             url: url,
    //             data:$('#teacherForm').serialize(),
    //             dataType:'json',
    //             success:function (data) {
    //                 if(data.code == 200){
    //                     location.href = '/teacher/list';
    //                 }
    //             }
    //         });
    //     });
    // }

    /* 使用表单验证和表单提交插件 */
    function submitForm(url){
       
        /* 选中form标签，绑定方法 */
        $('#teacherForm').validate({
            sendForm:false,//阻止默认提交
            valid:function () {
                /* 提交表单 */
                $(this).ajaxSubmit({
                    url:url,
                    dataType:'json',
                    success:function (data) {
                        if(data.code == 200){
                            location.href = '/teacher/list';
                        }
                    }
                });
            },
            description: {
                tcName:{
                    required:'讲师名称不能为空'
                },
                tcPass:{
                    required:'密码不能为空',
                    pattern:'密码必须为六位数字'
                },
                tcJoinDate:{
                    required:'日期不能为空'
                }
            }
            
        });
    }
});
