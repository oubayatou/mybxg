require.config({
    baseUrl: '/public/assets',
    paths: {
        jquery: 'jquery/jquery.min',
        cookie: 'jquery-cookie/jquery.cookie',
        template: 'artTemplate/template-web',
        bootstrap: 'bootstrap/js/bootstrap',
        datepicker:'bootstrap-datepicker/js/bootstrap-datepicker.min',
        language:'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        validate:'validate/jquery-validate.min',
        form:'jquery-form/jquery.form',
        uploadify:'uploadify/jquery.uploadify',
        region:'jquery-region/jquery.region',
        common: '../js/common',
        login: '../js/login',
        teacherList: '../js/techerlist',
        util:'../js/util',
        teacheradd:'../js/teacher-add',
        settings:'../js/settings'
    },
    shim: {
        bootstrap:{
            deps:['jquery']
        },
        language:{
            deps:['jquery','datepicker']
        },
        validate:{
            deps:['jquery']
        },
        uploadify:{
            deps:['jquery']
        }
    }
});
//require的shim中的兼容非标准模式的文件的依赖关系是deps，是个数组
/* language是非标准 的require模式，而且依赖于jquery和datepicker */