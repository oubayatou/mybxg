define(['jquery','template','ckeditor','uploadify','region','datepicker','language'],function ($,template,CKEDITOR) {
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
                    onUploadSuccess:function (a,b) {
                        var obj = JSON.parse(b);
                        $('.preview img').attr('src',obj.result.path);
                    }
                });
                /* 处理省市县三级联动 */
                $('#pcd').region({
                    url: '/public/assets/jquery-region/region.json'
                });
                /* 处理富文本编辑器 */
                CKEDITOR.replace('editor');
                
            }
        }
    });
});
