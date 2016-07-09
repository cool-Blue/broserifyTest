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
        (function(global) {
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
            var t, _ns = (typeof window !== "undefined" ? window['ns'] : typeof global !== "undefined" ? global['ns'] : null);

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
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
        "node-jsdom": 2
    }],
    2: [function(require, module, exports) {

    }, {}]
}, {}, [1]);