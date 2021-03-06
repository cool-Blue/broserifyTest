/**
 * Created by Admin on 15/07/2016.
 */
module.exports = function(_ns, main, docPath) {
    var t;
    if((t = typeof _ns) === 'function' && _ns.fn) {
        /**
         * if the object has members then this is the namespace, otherwise fall back on
         * window.ns
         *
         * run the app
         */
        _ns = Object.keys(_ns).length ? _ns : ns;
        main(_ns);
    } else if(t === 'function') {
        /**
         * if a function is returned, assume it is asking for a window object
         * assume that the callback returns the window object decorated with the exported
         * namespace.
         * This is the behaviour in node, this code is dead in the browser and simple-jsdom
         * needs to be --ignore 'ed, --exclude 'ed
         *
         * run the app
         **/

        docPath = docPath || 'index.html';

        var fs    = require("fs"),
            doc   = fs.readFileSync(docPath, 'utf8');

        require('jsdom').env(
            doc,
            function(err, window) {
                main(_ns(window));
                console.log(`HTML: \n ${window.document.documentElement.outerHTML}`);
                console.log(`\noutput: \n ${window.document.getElementById("output").textContent}`);
            }
        )
    }
};