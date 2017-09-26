define(['jquery','template','util','uploadify','Jcrop','form'],function ($,template,util) {
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
            });
            var img = $('.preview img');
            /* 处理封面裁切功能 */
            $('#cropBtn').click(function () {
                var flag = $(this).attr('data-flag');
                if(flag){
                //  提交页面
                   $('#cropForm').ajaxSubmit({
                       type:'post',
                       url:'/api/course/update/picture',
                       data:{cs_id:csId},
                       dataType:'json',
                       success:function (data) {
                            if(data.code==200){
                                location.href='/course/lesson?cs_id='+data.result.cs_id;
                            }
                       }
                   });
                }else{
                    /* 第一次点击 */
                    $(this).attr('data-flag',true).text('保存图片');
                    /* 实现图片裁切 */
                    crop();
                }
            });
            /* 封装一个图片裁切功能 */
            function crop() {
                img.Jcrop({
                    aspectRatio:2,
                    // setSelector:[100,100,200,100]
                },function () {
                    this.initComponent('Thumbnailer',{width:240,height:120,myThumb:".thumb"});
                    // console.log(this);
                    /* 获取图片的高度和宽度 */
                    var width = this.ui.stage.width;
                    var height = this.ui.stage.height;
                //    计算选取的数据
                    var x = 0;
                    var y = (height-width/2)/2;
                    var w = width;
                    var h = w/2;
                    /* 创建一个选取 */
                    this.newSelection();
                    this.setSelect([x,y,w,h]);
                });
                /* 监控选取的变化 */
                img.parent().on('cropstary,cropmove,cropend',function (a,b,c) {
                    /* 选取完成变化时把选取的数据填充到表单中 */
                    var formInputs = $('#cropForm').find('input');
                    formInputs.eq(0).val(c.x);
                    formInputs.eq(1).val(c.y);
                    formInputs.eq(2).val(c.w);
                    formInputs.eq(3).val(c.h);
                })
            }
        }
    });
});
