define(['jquery','template','ckeditor','uploadify','region','datepicker','language','validate','form'],function ($,template,CKEDITOR) {
//    调用接口，获取个人信息
    /* 根据sessionid查询当前用户 */
    $.ajax({
        url: '/api/teacher/profile',
        type:'get',
        dataType:'json',
        success:function (data) {
            //console.log(data);
            /* 解析数据 渲染页面 */
            if(data.code==200){
                var html = template('settingsTpl',data.result);
                $('#settingsInfo').html(html);
                /* 处理头像上传 */
                $('#upfile').uploadify({
                    height:120,
                    width:120,
                    buttonText:'',
                    itemTemplate:'<span></span>',
                    swf:'/public/assets/uploadify/uploadify.swf',
                    uploader:'/api/uploader/avatar',
                    fileObjName:'tc_avatar',
                    onUploadSuccess : function(a, date) {
                        var date = date.trim();
                        var dataObj=JSON.parse(date);
                        console.log(dataObj);
                        $('.preview img').attr('src',dataObj.result.path);
                    }
                });
                /* 处理省市县三级联动 */
                $('#pcd').region({
                    url: '/public/assets/jquery-region/region.json'
                });
                /* 处理富文本编辑器 */
                CKEDITOR.replace('editor');
                /* 处理表单提交 */
                $('#settingsForm').validate({
                    sendForm:false,
                    valid:function () {
                        var p = $('#p').find('option:selected').text();
                        var c = $('#c').find('option:selected').text();
                        var d = $('#d').find('option:selected').text();
                        var homeTown =p + '|' + c + '|' + d;
                        /* 更新富文本的内容 */
                        for (var instance in CKEDITOR.instances){
                            CKEDITOR.instances[instance].updateElement();
                        }
                        $(this).ajaxSubmit({
                            url:'/api/teacher/modify',
                            type:'post',
                            dataType:'json',
                            data:{tc_hometown:homeTown},
                            success:function (data) {
                                /* 刷新当前页面 */
                                location.reload();
                            }
                        });
                    }
                });
            }
        }
    });
});
