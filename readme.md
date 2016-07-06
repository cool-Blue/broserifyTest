How to exclude library files from browserify bundle
----

The answer is to use [browserify-shim][1]
In order to figure it out, I created a slightly more complicated scenario with a fake lib file (`main-a.js`) with two sub-dependencies (`m1.js` and `m2.js`) and made the app (`main-b.js`) dependent on the fake lib.

I rolled `main-a.js` into a stand-alone bundle that exposed one global called `fakeLib` and used a separate script tag in the index.html to load that.

I then used [browserify-shim][1] to build an isomorphic version of the app that required `main-a.js` in node, but used `window.fakeLib` in the browser.  


using this app:

    /**
     * main-b.js
     */
    require("./src/main-a").say();

This does not work: 

      "browserify-shim": {
        "./src/main-a": "fakeLib"
      },

but this does:

      "browserify-shim": {
        "./src/main-a": "global:fakeLib"
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
        <script type="text/javascript" src="dist/main-a-lib-pretty.js"></script>
        <script type="text/javascript" src="dist/bundle-B.js"></script>
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
     * main-a.js
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
      "main": "main-a.js",
      "dependencies": {
      },
      "devDependencies": {
        "browserify-shim": "^3.8.12"
      },
      "scripts": {
        "build-lib": "browserify ./main-a.js -s fakeLib > ../dist/main-a-lib-pretty.js",
        "build-lib-pretty": "browserify ./main-a.js -s fakeLib | js-beautify > ../dist/main-a-lib-pretty.js"
      },
      "author": "cool.blue",
      "license": "MIT",
      "description": ""
    }


----------


Fake app

    /**
     * main-b.js
     */
    require("./src/main-a").say();

package.json that uses [browserify-shim][1] to return `fakeLib` from `require("./src/main-a")` in the browser but acts like a normal CommonJS module in node.

    {
      "name": "browserify-nightmare",
      "version": "1.0.0",
      "main": "main-b.js",

      "browserify-shim": {
        "./src/main-a": "global:fakeLib"
      },
      "browserify": {
        "transform": "browserify-shim"
      },
      "devDependencies": {
        "browserify-shim": "^3.8.12"
      },

      "scripts": {
        "build-B": "browserify ./main-b.js > ./dist/bundle-B.js",
        "build-B-pretty": "browserify ./main-b.js | js-beautify > ./dist/bundle-B.js"
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
