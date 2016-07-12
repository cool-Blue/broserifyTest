/**
 * fake-lib.js
 * 
 * jQuery-like stub for testing jquery behaviour in modules
 * 
 * returns a test namespace instead of the jQuery object
 * 
 */

(function(global, factory) {
    if(typeof module === "object" && typeof module.exports === "object") {

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
                 if(!w.document) {
                     throw new Error("jQuery requires a window with a document");
                 }
                 return factory(w);
             };
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this,
    function(window, noGlobal) {
        var _ns = function(){
            return new _ns.fn.init()
        };
        _ns.fn = _ns.prototype = {
            instance: '',
            constructor: _ns,
            first: "first module",
            second: "second module",
            op: function op(t){
                window.document && window.document.getElementById("output")
                    ? window.document.getElementById("output").textContent += t + "\n"
                    : console.log(t);
            }
        };
        var init = _ns.fn.init = function(){
            this.instance = Date.now();
        };
        init.prototype = _ns.fn;
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
        if ( typeof define === "function" && define.amd ) {
            define( "ns", [], function() {
                return ns;
            } );
        }
        if ( !noGlobal ) {
            window.ns = _ns;
        }

        return _ns
    });
