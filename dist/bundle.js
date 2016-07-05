(function e(modulest, n, main_module) {
    function s(o, u) {
        if(!n[o]) {
            if(!modulest[o]) {
                var a = typeof require == "function" && require;
                if(!u && a)return a(o, !0);
                if(window_require)return window_require(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {exports: {}};
            modulest[o][0].call(l.exports, function(e) {
                var n = modulest[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, modulest, n, main_module)
        }
        return n[o].exports
    }

    var window_require = typeof require == "function" && require;
    for(var o = 0; o < main_module.length; o++)s(main_module[o]);
    return s
})({
    1: [function(require, module, exports) {

    }, {}],

    2: [function(require, module, exports) {
        var m1 = require("./src/m1") || window.m1;
        var m2 = require("./src/m2");

        console.log(m1);
        console.log(m2);
    }, {"./src/m1": 1, "./src/m2": 3}],

    3: [function(require, module, exports) {
        module.exports = "second module";
    }, {}]

}, {}, [2]);
