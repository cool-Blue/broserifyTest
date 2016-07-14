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
var _ns = require("./dist/lib-bundle.js");

require("./src/shimWindow")(_ns, function(ns){
    _ns = ns;
    module.exports = _ns;
    require("./src/fake-plugin.js");
    main(_ns)
}, docPath);

function main(nS){
    var $output = nS("#output");
    $output.op($output.first);
    $output.op($output.second);
    $output.op("app.js");
    $output.sub_op("app.js")
}