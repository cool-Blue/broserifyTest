/**
 * app.js
 */
// var local_ns = require("./src/fake-lib.js");
var local_ns = require("./dist/lib-bundle.js").ns;
local_ns = Object.keys(local_ns).length ? local_ns : ns;

function op(t){
    this.document
        ? document.getElementById("output").textContent += t + "\n"
        : console.log(t);
}
op(local_ns.first);
op(local_ns.second);
