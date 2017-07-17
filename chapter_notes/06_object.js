// ======= //
// History //
// ======= //

// Objects came into being as a solution to the problem of complexity as a way to
// break down long, complicated code into smaller parts.

// Objects can keep a lot of complex code stashed away inside of them while
// offering a simple interface to interact with that code.

// ======= //
// Methods //
// ======= //

// Methods are object properties that hold functions.

var rabbit = {};
rabbit.speak = function(line) {
  console.log("The rabbit says '" + line + "'");
};

rabbit.speak("I'm alive!");

// Methods usually have something to do with the object from which they are called.
// A method invoked with the 'this' variable points back to that object.

function speak(line) {
  console.log("The " + this.type + " rabbit says '" + line + "'");
}

var whiteRabbit = { type: "white", speak: speak };
var fatRabbit = { type: "fat", speak: speak };

whiteRabbit.speak("Oh my ears and whiskers, " +
                  "how late it's getting!");

fatRabbit.speak("I could sure use a carrot right now.");

// Apply and call are methods that can be used to simulate a method call. The first
// argument is used to bind to the variable 'this'.

speak.apply(fatRabbit, ["Burp!"]);
speak.call({ type: "old" }, "Oh my!");

// Prototypes
// ==========

var empty = {};
console.log(empty.toString);
console.log(empty.toString());

// Almost all objects start with a prototype that contains fallback methods. The
// Object.prototype object is the basic prototype of most objects.

console.log(Object.getPrototypeOf({}) ==
            Object.prototype);

console.log(Object.getPrototypeOf(Object.prototype));

// Object prototypes form a tree-like structure rooted in Object.prototype.
// Methods like 'toString' come from Object.prototype. However, Object.prototype
// is not the only prototype. For example, Function.prototype or Array.prototype.

console.log(Object.getPrototypeOf(isNaN) == Function.prototype);
console.log(Object.getPrototypeOf([]) == Array.prototype);

// These prototypes have a prototype themselves, which is usually the Object.prototype.

// You can make your own prototype as well, and then create objects based on that
// prototype using Object.create.

var protoRabbit = {
  speak: function(line) {
    console.log("The " + this.type + " rabbit says '" + line + "'");
  }
};
var killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREEEEE!");

// The prototype is a container for properties and methods to be used by all
// instances of that type of object.

// Constructors
// ============

// Calling a function with 'new' in front of it causes that function to be called
// as a constructor.

function Rabbit(type) {
  this.type = type;
}

var killerRabbit = new Rabbit("killer");
var blackRabbit = new Rabbit("black");
console.log(blackRabbit.type);

// A constructor automatically has a prototype object that is empty. You can add
// methods and properties to this object and all instances of this constructor
// will have access to these.

Rabbit.prototype.speak = function(line) {
  console.log("The " + this.type + " rabbit says '" + line + "'");
};

blackRabbit.speak("Doom...");

// Overriding derived properties
// =============================

// Adding a property of the same name as a prototype property to an instance
// object itself will override that prototype property.

Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
killerRabbit.teeth = "long, sharp and bloody";
console.log(killerRabbit.teeth);
console.log(blackRabbit.teeth);
console.log(Rabbit.prototype.teeth);

// If called properties are not found on the object itself, the prototypes will
// be checked in order to find a property of that name.

// Prototype interference
// ======================

// Adding a property to a prototype makes it available to all objects under that
// prototype.

Rabbit.prototype.dance = function() {
  console.log("The " + this.type + " rabbit dances a jig.");
};

killerRabbit.dance();

var map = {};
function storePhi(event, phi) {
  map[event] = phi;
}

storePhi("pizza", 0.069);
storePhi("touched tree", -0.081);

// However, prototypal properties cna get in the way if you're running a for/in loop.

Object.prototype.nonsense = "hi";
for (var name in map)
  console.log(name);

console.log("nonsense" in map);
console.log("toString" in map);

// While 'nonsense' showed up in our loop using for/in, 'toString' did not. This
// is due to the enumerable/nonenumerable property available to object properties.

// Properties that are simply defined using the standard notation are enumerable.
// By using the Object.defineProperty, we can set a property to nonenumerable.

Object.defineProperty(Object.prototype, "hiddenNonsense",
                      {enumerable: false, value: "hi"});

for (var name in map)
  console.log(name);
console.log(map.hiddenNonsense);

// However, even nonenumerable properties show up when using the 'in' operator.
// In order to avoid this, we can use the 'hasOwnProperty' method.

console.log(map.hasOwnProperty("toString"));

// This property only checks the properties of the object in question and not those
// in the prototypal object. If there is concern that there is chaff in the
// object prototype, for/in loops can be written like this:

for (var name in map) {
  if (map.hasOwnProperty(name)) {
    // ...this is an own property
  }
}

// Prototype-less objects
// ======================

// Unfortunately, even the 'hasOwnProperty' method can be reset on an instance
// object. This would make the method uncallable.

// Sometimes prototypes can just get in the way and be more of a hassle than they're
// worth. In such a case, a blank prototype can be used by passing 'null' to
// Object.create:

var map = Object.create(null);
map["pizza"] = 0.069;
console.log("toString" in map);
console.log("pizza" in map);

// Polymorphism
// ============

// Objects such as arrays and functions override the basic toString method in order
// to make a more useful method for those types.

var a = {a: 1, b: 2};
var b = [1, 2, 3];
var c = function(a) {
  return a;
};

console.log(a.toString()); // => [object Object]
console.log(b.toString()); // => 1,2,3
console.log(c.toString()); // =>
// function (a) {
//   return a;
// }

// This is a very basic example of polymorphism. Each of these prototypes offers
// the same public interface which abstracts different underlying code. This allows
// any piece of code expecting the toString interface to work with each of these//
// object types. This is a very powerful paradigm.
