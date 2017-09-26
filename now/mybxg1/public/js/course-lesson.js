define(['jquery','template','util'],function ($,template,util) {
    /* 设置菜单项的选中效果 */
    util.setMenu('/course/course_add');
    var csId = util.qs('cs_id');
    console.log(csId);
});
