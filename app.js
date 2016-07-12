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
const docPath = 'index.html';
var fs = require("fs"),
    doc = fs.readFileSync(docPath, 'utf8'),
    t, _ns = require("./dist/lib-bundle.js");
// var t, _ns = require("./dist/lib-bundle-r.js");
// var t, _ns = require("./dist/lib-bundle-thingy.js");

if((t = typeof _ns) === 'object'){
    /**
     * if the object has members then this is the namespace, otherwise fall back on
     * window.ns
     *
     * run the app
     */
    _ns = Object.keys(_ns).length ? _ns : ns;
    main();
}else if(t === 'function') {
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
        doc,
        function (err, window) {
            main(_ns(window));
            console.log(`HTML: \n ${window.document.documentElement.outerHTML}`);
            console.log(`\noutput: \n ${window.document.getElementById("output").textContent}`);
        }
    )
}

function main(ns){
    ns.op(ns.first);
    ns.op(ns.second);
    ns.op("app.js")
}