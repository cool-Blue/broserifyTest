/**
 * fake-plugin
 */
(function (factory) {
    if(typeof exports === "object") {
        factory(require("../app"));
    } else {
        factory(ns);
    }
}(function(_ns){
    _ns.fn.sub_op = function(t){
        _ns().op(`sub lib: ${t}`)
    }
}));
