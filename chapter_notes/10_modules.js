// ================ //
// Why modules help //
// ================ //

// modules help divide projects into sensible chunks, which are easier
// for a new reader to read, and also provide a structure for the programmer

// writing code like a text with a well-defined order and lots of
// comments is called 'literate programming'

// Namespacing
// ===========

// Javascript does not have a scope level between global and local, meaning
// everything outside of a function scope is visible everywhere

// Namespace pollution can occur when a lot of unrelated code exists in the global
// scope. This can be mitigated by using objects to create public subnamespaces
// or functions to create private namespaces

// Reuse
// =====

// Reusing code written for specific projects can be difficult and time-consuming,
// but separating modular code into different files with different functionality
// makes code easier to track, update and share.

// This is the basic premise behind code libraries and NPM, the system for updating
// and sharing these libraries.

// Decoupling
// ==========

// Modular code is isolated from other pieces of code in the project, meaning when
// the module is updated, the code that depends on that module remains unchanged.

// A good modular interface will not change on being updated. Functionality can
// be added, but the existing functionality can still be used by existing programs.

// ============================= //
// Using functions as namespaces //
// ============================= //

// New scopes in Javascript (before ES6) can only be created through functions,
// meaning to give modules their own namespace, we must base them in functions.

var names = ["Sunday", "Monday", "Tuesday", "Wedneday", "Thursday", "Friday", "Saturday"];
function dayName(number) {
  return names[number];
}

// In the above example, the 'names' variable spills into the global namespaces
// Below is a safer solution. By wrapping the 'names' variable in a function and returning
// a function as the interface to utilize this variable, the 'names' variable is
// completely hidden from the rest of the code. It is inaccessible outside of the
// the 'dayName' scope.

var dayName = function() {
  var names = ["Sunday", "Monday", "Tuesday", "Wedneday", "Thursday", "Friday", "Saturday"];
  return function(number) {
    return names[number];
  };
}();

console.log(dayName(3));

// Isolating code entirely:

(function() {
  function square(x) { return x * x; }
  var hundred = 100;

  console.log(square(hundred));
})();

// ===================== //
// Objects as interfaces //
// ===================== //

// In order to wrap two or more functions in their own namespace, we must use an
// object to wrap them.

var weekDay = function() {
  var names = ["Sunday", "Monday", "Tuesday", "Wedneday", "Thursday", "Friday", "Saturday"];

  return {
    name: function(number) { return names[number]; },
    number: function(name) { return names.indexOf(name); }
  };
}();

console.log(weekDay.name(weekDay.number("Sunday")));

// In order to better organize code, you can create an object of code to be exported

(function(exports) {
  var names = ["Sunday", "Monday", "Tuesday", "Wedneday", "Thursday", "Friday", "Saturday"];

  exports.name = function(number) {
    return names[number];
  };
  exports.number = function(name) {
    return names.indexOf(name);
  };
})(this.weekDay = {});

console.log(weekDay.name(weekDay.number("Saturday")));

// =============================== //
// Detaching from the global scope //
// =============================== //

// Evaluating data as code
// =======================

// There are two basic ways of interpreting data as code. The first is the infamous
// 'eval', which should not be used. The second is the Function constructor,
// which takes a comma-separated list of arguments and a string with the function
// body.

var plusOne = new Function("n", "return n + 1;");
console.log(plusOne(4));

// Require
// =======

function require(name) {
  var code = new Function("exports", readFile(name));
  var exports = {};
  code(exports);
  return exports;
}

// Note: Javascript does not have a 'readFile' function, so this is a bit of
// pseudocode in this example.

// The 'require' function wraps the exported module in a Function, meaning we don't
// have to do so in the code for the module itself. It also turns the exports
// arguments into an object, which also cleans up our code. So we can just write
// the module like so:

var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

exports.name = function(number) {
  return names[number];
};

exports.number = function(name) {
  return names.indexOf(name);
};

// A module will usually start by loading in the modules it requires:

var weekDay = require("weekDay");
var today = require("today");

// This simplified 'require' implementations has problems: 1. each module will be
// loaded every time a different module requires it and 2. a module can only
// export the 'exports' object. The additional object, 'module', solves these problems.

function require(name) {
  if (name in require.cache)
    return require.cache[name];

  var code = new Function("exports, module", readFile(name));
  var exports = {}, module = {exports: exports};
  code(exports, module);

  require.cache[name] = module.exports;
  return module.exports;
}
require.cache = Object.create(null);

// This is a very crude implementation of the real CommonJS module standard, which
// is built into the Node.js system.

// Slow-loading modules
// ====================

// The CommonJS system isn't ideal for the browser because loading the modules
// over the web is much slower than on the hard disk.

 // Asyncronous Module Definition (AMD) can be used to load modules and their
 // dependencies in the background while the page continues to load.

 define(["weekDay", "today"], function(weekDay, today) {
   console.log(weekDay.name(today.dayNumber()));
 });

 // The define function loads the required dependencies and then once they are loaded,
 // call the function with the interfaces of the dependencies.

define([], function() {
  var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return {
    name: function(number) { return names[number]; },
    number: function(name) { return names.indexOf(name); }
  };
});

// Each module that uses this system must also be written using this structure.

// Once again creating a crude version of 'define', which will have a pseudocode
// 'backgroundReadFile' function which takes a filename and a function that calls
// the content of the file when it has finished loading.

var defineCache = Object.create(null);
var currentMod = null;

function getModule(name) {
  if (name in defineCache)
    return defineCache[name];

  var module = {
    exports: null,
    loaded: false,
    onLoad: []
  };
  defineCache[name] = module;
  backgroundReadFile(name, function(code) {
    currentMod = module;
    new Function("", code)();
  });
  return module;
}

function define(depNames, moduleFunction) {
  var myMod = currentMod;
  var deps = depNames.map(getModule);

  deps.forEach(function(mod) {
    if (!mod.loaded)
      mod.onLoad.push(whenDepsLoaded);
  });

  function whenDepsLoaded() {
    if (!deps.every(function(m) { return m.loaded; }))
      return;

    var args = deps.map(function(m) { return m.exports; });
    var exports = moduleFunction.apply(null, args);
    if (myMod) {
      myMod.exports = exports;
      myMod.loaded = true;
      myMod.onLoad.forEach(function(f) { f(); });
    }
  }
  whenDepsLoaded();
}

// This code is arduous and difficult to follow due to the nature of asyncronicity.
// RequireJS is a popular real implementation of this pattern.

// Interface design
// ================

// Interface design is a subtle art. The best way to get good at it is to utilize
// many types of interface design and learn the nuances of many of them.

// Predictability
// ==============

// A module with an predictable interface is easier to use. It is best to follow
// conventions when possible. Behavior should also be predictable and easy to
// understand rather than clever.

// Composability
// =============

// Simple data structures and pure functions make for better modules that are
// easier to compose with other code. This also increases reusability.

// Layered interfaces
// ==================

// Often times it is useful to provide 2 interfaces to your code: one that is
// simple and high-level for regular use, and another that is low-level and detailed
// for those that want more complex functionality.
