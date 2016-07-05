(function(f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f()
    } else if (typeof define === "function" && define.amd) {
        define([], f)
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window
        } else if (typeof global !== "undefined") {
            g = global
        } else if (typeof self !== "undefined") {
            g = self
        } else {
            g = this
        }
        g.mainA = f()
    }
})(function() {
    var define, module, exports;
    return (function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND", f
                }
                var l = n[o] = {
                    exports: {}
                };
                t[o][0].call(l.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e)
                }, l, l.exports, e, t, n, r)
            }
            return n[o].exports
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s
    })({
        1: [function(require, module, exports) {
            /**
             * m1.js
             */
            exports.say = "first module";
        }, {}],
        2: [function(require, module, exports) {
            /**
             * m2.js
             */
            exports.say = "second module";
        }, {}],
        3: [function(require, module, exports) {
            /**
             * main-a.js
             */
            var m1 = this.m1 || require("./m1");
            var m2 = require("./m2");

            exports.say = function() {
                function op(t) {
                    this.document ?
                        document.getElementById("output").textContent += t + "\n" :
                        console.log(t);
                }
                op(m1.say);
                op(m2.say);
            };

        }, {
            "./m1": 1,
            "./m2": 2
        }]
    }, {}, [3])(3)
});