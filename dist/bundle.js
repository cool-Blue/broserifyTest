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
         *
         * Isomorphic test to shim jQuery-like stub
         * 
         * shims jQuery stub in node by using simple-jsdom
         * designed to be built with --ignore simple-jsdom
         * writes to the document in the browser or to the console in node
         *
         * if the require returns
         *  a proper namespace
         *  -   just use local_ns as the namespace
         *  an empty object
         *  -   fall back on a global namespace
         *  a function
         *  -   assume the lib module is asking for a window object to act as global
         *
         */
        var t, _ns = require("./dist/lib-bundle.js");

        if ((t = typeof _ns) === 'object') {
            /**
             * if the object has members then this is the namespace, otherwise fall back on
             * window.ns
             *
             * run the app
             */
            _ns = Object.keys(_ns).length ? _ns : ns;
            main();
        } else if (t === 'function') {
            /**
             * if a function is returned, assume it is asking for a window object
             * assume that the callback returns the window object decorated with the exported
             * namespace.
             * This is the behaviour in node, this code is dead in the browser and simple-jsdom
             * needs to be --ignore 'ed, --exclude 'ed
             *
             * run the app
             * */
            var jsdom = require('node-jsdom');

            jsdom.env(
                "https://github.com/cool-Blue/broserifyTest/tree/without-global",
                function(err, window) {
                    _ns = _ns(window);
                    main();
                }
            )
        }

        function main() {
            function op(t) {
                this.document ?
                    document.getElementById("output").textContent += t + "\n" :
                    console.log(t);
            };

            op(_ns.first);
            op(_ns.second);

        }
    }, {
        "./dist/lib-bundle.js": 2,
        "node-jsdom": undefined
    }],
    2: [function(require, module, exports) {
        (function(global) {
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
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}]
}, {}, [1]);