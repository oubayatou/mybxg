define(['jquery','template','util','uploadify'],function ($,template,util) {
    /* 设置导航选中效果 */
    util.setMenu('/course/course_add');
    /* 获取课程id */
    var csId = util.qs('cs_id');
    /* 获取课程图片信息 */
    $.ajax({
        type: 'get',
        url:'/api/course/picture',
        data:{cs_id:csId},
        dataType:'json',
        success:function (data) {
            // console.log(data);
            /* 解析数据 渲染页面 */
            var html = template('pictureTpl',data.result);
            $('#pictureInfo').html(html);
            /* 处理封面上传 */
            $('#myfile').uploadify({
                swf:'/public/assets/uploadify/uploadify.swf',
                uploader:'/api/uploader/cover',
                width:80,
                height:'auto',
                itemTemplate:'<span></span>',
                buttonText:'选择图片',
                buttonClass:'btn btn-success btn-sm',
                fileObjName:'cs_cover_original',
                formData:{cs_id:csId},
                onUploadSuccess:function (a,b) {
                    console.log(b);
                    var obj = JSON.parse(b.trim());
                    // console.log(obj);
                    $('.preview img').attr('src',obj.result.path);
                }
            })
        }
    });
});
