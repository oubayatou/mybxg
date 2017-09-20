define(['m4'],function (m4) {
    console.log(m4);
    var multiply = function (a,b) {
        return a * b;
    };
    var divide = function (a,b) {
        return a / b;
    };
    return {
        multiply : multiply,
        divide : divide
    }
});
