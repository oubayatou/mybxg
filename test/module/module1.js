define(function(){
    var sum = function (a,b) {
        return a + b;
    };
    var subtract = function (a,b) {
        return a - b;
    };
    return {
        sum: sum,
        subtract: subtract
    };
});
