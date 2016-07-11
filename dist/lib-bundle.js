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
        g.ns = f()
    }
})(function() {
    var define, module, exports;
    return (function e(moduleDefs, n, r) {
        function s(moduleDef, u) {
            if (!n[moduleDef]) {
                if (!moduleDefs[moduleDef]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(moduleDef, !0);
                    if (i) return i(moduleDef, !0);
                    var f = new Error("Cannot find module '" + moduleDef + "'");
                    throw f.code = "MODULE_NOT_FOUND", f
                }
                var module = n[moduleDef] = {
                    exports: {}
                };
                moduleDefs[moduleDef][0].call(module.exports, function(e) {
                    var n = moduleDefs[moduleDef][1][e];
                    return s(n ? n : e)
                }, module, module.exports, e, moduleDefs, n, r)
            }
            return n[moduleDef].exports
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s
    })({
        1: [function(require, module, exports) {
            /**
             * fake-lib.js
             * 
             * jQuery-like stub for testing jquery behaviour in modules
             * 
             * returns a test namespace instead of the jQuery object
             * 
             */

            (function(global, factory) {
                if (typeof module === "object" && typeof module.exports === "object") {

                    /**
                     *
                     *      For CommonJS and CommonJS-like environments where a proper `window`
                     *      is present, execute the factory and get jQuery.
                     *      For environments that do not have a `window` with a `document`
                     *      (such as Node.js), expose a factory as module.exports.
                     *      This accentuates the need for the creation of a real `window`.
                     *      e.g. var jQuery = require("jquery")(window);
                     *      See ticket #14549 for more info.
                     */
                    module.exports = global.document ?
                        factory(global, true) :
                        function(w) {
                            if (!w.document) {
                                throw new Error("jQuery requires a window with a document");
                            }
                            return factory(w);
                        };
                } else {
                    factory(global);
                }
            })(typeof window !== "undefined" ? window : this,
                function(window, noGlobal) {
                    var _ns = {};
                    _ns.first = "first module";
                    _ns.second = "second module";

                    /**
                     *		Register as a named AMD module, since jQuery can be concatenated with other
                     *		files that may use define, but not via a proper concatenation script that
                     *		understands anonymous AMD modules. A named AMD is safest and most robust
                     *		way to register. Lowercase jquery is used because AMD module names are
                     *		derived from file names, and jQuery is normally delivered in a lowercase
                     *		file name. Do this after creating the global so that if an AMD module wants
                     *		to call noConflict to hide this version of jQuery, it will work.
                     *		Note that for maximum portability, libraries that are not jQuery should
                     *		declare themselves as anonymous modules, and avoid setting a global if an
                     *		AMD loader is present. jQuery is a special case. For more information, see
                     *		https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
                     *
                     */
                    if (typeof define === "function" && define.amd) {
                        define("ns", [], function() {
                            return ns;
                        });
                    }
                    if (!noGlobal) {
                        window.ns = _ns;
                    }

                    return _ns
                });

        }, {}]
    }, {}, [1])(1)
});