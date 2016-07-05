/**
 * main-a-cdn.js
 */
var m1 = this.m1 || require("./src/m1");
var m2 = require("./src/m2");

exports.say = function() {
    function op(t){
        this.document
            ? document.getElementById("output").textContent += t + "\n"
            : console.log(t);
    }
    op(m1.say);
    op(m2.say);
};
