# How to exclude library files from browserify bundle
## delete `global:` in  `browserify-shim` node - BREAKS
----

The answer is to use [browserify-shim][1]
In order to figure it out, I created a slightly more complicated scenario with a fake lib file (`fake-lib.js`) with two sub-dependencies (`m1.js` and `m2.js`) and made the app (`app.js`) dependent on the fake lib.

I rolled `fake-lib.js` into a stand-alone bundle that exposed one global called `fakeLib` and used a separate script tag in the index.html to load that.

I then used [browserify-shim][1] to build an isomorphic version of the app that required `fake-lib.js` in node, but used `window.fakeLib` in the browser.  


using this app:

    /**
     * app.js
     */
    require("./src/fake-lib").say();

This does not work: 

      "browserify-shim": {
        "./src/fake-lib": "fakeLib"
      },

but this does:

      "browserify-shim": {
        "./src/fake-lib": "global:fakeLib"
      },

You must use this `global:` 
I think that may be due to a bug in browserify because it doesn't agree with the [browserify handbook][2]

----------
index.html

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>browserify test</title>
    </head>
    <body>
        <div style="white-space: pre;" id="output"></div>
        <script type="text/javascript" src="dist/fake-lib-bundle-pretty.js"></script>
        <script type="text/javascript" src="dist/bundle.js"></script>
    </body>
    </html>

----------


Fake library...

    /**
     * m1.js
     */
    exports.say = "first module";
.
 
    /**
     * m2.js
     */
    exports.say = "second module";
.

    /**
     * fake-lib.js
     */
    var m1 = require("./src/m1");
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

package.json for fake lib.  This makes a standalone package that exposes fakeLib

    {
      "name": "browserify-nightmare",
      "version": "1.0.0",
      "main": "fake-lib.js",
      "dependencies": {
      },
      "devDependencies": {
        "browserify-shim": "^3.8.12"
      },
      "scripts": {
        "build-lib": "browserify ./fake-lib.js -s fakeLib > ../dist/fake-lib-bundle-pretty.js",
        "build-lib-pretty": "browserify ./fake-lib.js -s fakeLib | js-beautify > ../dist/fake-lib-bundle-pretty.js"
      },
      "author": "cool.blue",
      "license": "MIT",
      "description": ""
    }


----------


Fake app

    /**
     * app.js
     */
    require("./src/fake-lib").say();

package.json that uses [browserify-shim][1] to return `fakeLib` from `require("./src/fake-lib")` in the browser but acts like a normal CommonJS module in node.

    {
      "name": "browserify-nightmare",
      "version": "1.0.0",
      "main": "app.js",

      "browserify-shim": {
        "./src/fake-lib": "global:fakeLib"
      },
      "browserify": {
        "transform": "browserify-shim"
      },
      "devDependencies": {
        "browserify-shim": "^3.8.12"
      },

      "scripts": {
        "build-B": "browserify ./app.js > ./dist/bundle.js",
        "build-B-pretty": "browserify ./app.js | js-beautify > ./dist/bundle.js"
      },
      "author": "cool.blue",
      "license": "MIT",
      "description": ""
    }


----------

[this answer][3] was super-helpful


  [1]: https://npmjs.org/package/browserify-shim
  [2]: https://github.com/substack/browserify-handbook/blob/master/readme.markdown#browserify-shim
  [3]: http://stackoverflow.com/a/25585778/2670182
