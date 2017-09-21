require.config({
    baseUrl: '/public/assets',
    paths: {
        jquery: 'jquery/jquery.min',
        cookie: 'jquery-cookie/jquery.cookie',
        template: 'artTemplate/template-web',
        bootstrap: 'bootstrap/js/bootstrap',
        common: '../js/common',
        login: '../js/login',
        teacherList: '../js/techerlist'
    },
    shim: {
        bootstrap:{
            deps:['jquery']
        }

    }
});
//require的shim中的兼容非标准模式的文件的依赖关系是deps，是个数组