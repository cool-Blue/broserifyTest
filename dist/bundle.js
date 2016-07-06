(function e(t, n, r) {
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
         * app.js
         */
        require("fake-lib").say();
    }, {
        "fake-lib": 2
    }],
    2: [function(require, module, exports) {
        (function(global) {;
            var __browserify_shim_require__ = require;
            (function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
                /**
                 * fake-lib.js
                 */
                var m1 = __browserify_shim_require__("./m1");
                var m2 = __browserify_shim_require__("./m2");

                exports.say = function() {
                    function op(t) {
                        this.document ?
                            document.getElementById("output").textContent += t + "\n" :
                            console.log(t);
                    }
                    op(m1.say);
                    op(m2.say);
                };

                ;
                browserify_shim__define__module__export__(typeof fakeLib != "undefined" ? fakeLib : window.fakeLib);

            }).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) {
                module.exports = ex;
            });

        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}]
}, {}, [1]);