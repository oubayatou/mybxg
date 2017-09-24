define(['jquery'],function ($) {
    /* 封装一个获取url中的参数的方法 */
    return {
        qs:function (key) {
            var param = location.search.substr(1);
            var tcId = null;
            if(param){
                /* 要考虑多参数的情况 */
                var ps = param.split('&');
                $.each(ps,function (i, item) {
                    var kv = item.split('=');
                    if(kv[0] == key){
                        tcId = kv[1];
                        return false;
                        //终止each循环，之前的原生的js中的foreach不能用这个方法终止，some可以
                    }
                });
            }
            return tcId;
        },
        setMenu:function (path) {
            $('.aside .navs a[href="'+path+'"]').addClass('active');
        }
    }
});
