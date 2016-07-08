How to reference files loaded from a CDN in a script tag from browserify bundle
----

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>browserify test</title>
</head>
    <body>
        <div style="white-space: pre;" id="output"></div>
        <script type="text/javascript" src="src/fake-lib.js"></script>
        <script type="text/javascript" src="dist/bundle.js"></script>
    </body>
</html>
```

#### The answer is to use [browserify-shim][1] 

using this fake lib, which adds a name space to the global object:
```js
/**
 * fake-lib.js
 */
 
(function(global){
    var _ns = global.ns = {};
    _ns.first = "first module";
    _ns.second = "second module";
})(this);
```
and this fake app to consume it:
```js
/**
 * app.js
 */
var local_ns = require("./src/fake-lib.js");


function op(t){
    this.document
        ? document.getElementById("output").textContent += t + "\n"
        : console.log(t);
}
op(local_ns.first);
op(local_ns.second);
```
#### Option 1 - make a local copy of the global namespace and include the lib in the bundle
1.  The browserify-shim node causes the global `ns` to be returned by `require("./src/fake-lib.js")`
1.  If _**required**_, the lib is included in the bundle
1.  The included lib is wrapped so that `ns` is returned by `require("./src/fake-lib.js")`

package.json
```js

"browserify-shim": {
    "./src/fake-lib.js": "ns"
},
"browserify": {
    "transform": "browserify-shim"
},
```

This is equivalent to... 
```js
"browserify-shim": {
    "./src/fake-lib.js": {"exports": "ns"}
},
```

### Option 2 - make a local copy of the global namespace and exclude from the bundle
1.  The browserify-shim node causes the global `ns` to be returned by `require("./src/fake-lib.js")`
1.  Even if _required_, the lib will not be included in the bundle

package.json
```js
"browserify-shim": {
    "./src/fake-lib.js": "global:ns"
},
"browserify": {
    "transform": "browserify-shim"
},
```
This is equivalent to... 
```js
"browserify-shim": {
    "./src/fake-lib.js": {"exports": "global:ns"}
},
```
This method simply replaces 
```js
    var local_ns = require("./src/fake-lib.js");
```    
with
```js
    var local_ns = (typeof window !== "undefined" ? window['ns'] : typeof global !== "undefined" ? global['ns'] : null);
```
The lib source does not need to be included in the project so `./src/fake-lib.js` could be replaced by anything.
It's only purpose is to tell the require statement which member to strip off the global context.

For example...
```js
    /**
     * app.js
     */
    var local_ns = require("fakeLib");
```    
and in the package.json...
```js
    "browserify-shim": {
        "fakeLib": "global:ns"
    },
```
### Option 3 - directly reference the global namespace and include in the bundle
1.  The browserify-shim node causes the `require("./src/fake-lib.js")` to execute the lib code every time (thus, re-decorating the global object)
1.  If _**required**_, the lib is included in the bundle
1.  The included lib is wrapped so that `require("./src/fake-lib.js")` executes the lib code with the `this` context set to the global object

package.json
```js
"browserify-shim": {
    "./src/fake-lib.js": {"exports": null}
},
"browserify": {
    "transform": "browserify-shim"
},
```

How to wrap a lib that adds a namespace onto the global object and include in the bundle
----

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>browserify test</title>
</head>
    <body>
        <div style="white-space: pre;" id="output"></div>
        <script type="text/javascript" src="dist/bundle.js"></script>
    </body>
</html>
```
This time, we want to wrap the the lib in such a way that it cannot pollute the global namespace but, can be accessed by other modules in the bundle as if it is on the global.

##### step 1 - bundle the lib as a _standalone_ module
To do this we need to use the -s option (--standalone) in the build
```js
  "browserify-shim": {
    "./src/fake-lib.js": {"exports": "ns"}
  },
  "browserify": {
    "transform": "browserify-shim"
  },
  "scripts": {
    "build": "browserify ./fake-lib.js -s ns > ../dist/lib-bundle.js",
    "build-pretty": "browserify ./fake-lib.js -s ns | js-beautify > ../dist/lib-bundle.js"
  },
```
----------
----------

[this answer][3] was super-helpful


  [1]: https://npmjs.org/package/browserify-shim
  [2]: https://github.com/substack/browserify-handbook/blob/master/readme.markdown#browserify-shim
  [3]: http://stackoverflow.com/a/25585778/2670182
