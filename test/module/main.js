define(['m1','m2','hehe'],function (m1,m2,t) {
    /* 第一个参数可以添加依赖 */
    /* 这里就是一个模块，拥有私有空间 */
    var abc = 123;
    console.log(m2);
    t();
    var fn = function () {
        console.log('hello world');
    };
    var obj = {
        fn:fn,
        foo: function () {
            console.log('foo');
        }
    };
    return obj;
});
