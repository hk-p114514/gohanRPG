var f = function (func) {
    func();
};
var g = function () {
    return 0;
};
f(g());
f(g);
