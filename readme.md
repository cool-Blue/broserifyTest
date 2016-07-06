How to exclude library files from browserify bundle
----

This branch tries to use --require and --exclude flags for code splitting.
 
 This version uses an alias for the sub-module.
 
 ---
 
     /**
      * package.json
      */
    "scripts": {
     "build-m1": "browserify -r ./src/m1.js:m1 > ./dist/m1-bundle.js",
     "build-bundle": "browserify -x m1 -d ./fake-lib.js > ./dist/bundle.js",
    },

Key points here are `-r ./src/m1.js:m1` and `-x m1`

     /**
      * fake-lib.js
      */
     var m1 = require("m1");
     var m2 = require("./src/./m2");
     
     exports.say = function() {
         function op(t){
             this.document
                 ? document.getElementById("output").textContent += t + "\n"
                 : console.log(t);
         }
         op(m1.say);
         op(m2.say);
     };
     
     exports.say();
     
 Key point here is `require("m1")`
 ---