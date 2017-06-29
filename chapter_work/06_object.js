// Methods
var rabbit = {};
rabbit.speak = function(line) {
  console.log('The rabbit says "' + line + '"')
};

rabbit.speak('I\'m alive!');

function speak(line) {
  console.log('The ' + this.type + ' rabbit says "' + line + '"');
}

var whiteRabbit = { type: 'white', speak: speak };
var fatRabbit = { type: 'fat', speak: speak };

whiteRabbit.speak('Oh my ears and whiskers, ' +
                  'how late it\'s getting!');

fatRabbit.speak('I could sure use a carrot right now.');

speak.apply(fatRabbit, ['Burp!']);
speak.call({ type: 'old' }, 'Oh my!');

// Prototypes
var empty = {};
console.log(empty.toString);
console.log(empty.toString());

console.log(Object.getPrototypeOf({}) ==
            Object.prototype);

console.log(Object.getPrototypeOf(Object.prototype));

var protoRabbit = {
  speak: function(line) {
    console.log('The ' + this.type + ' rabbit says "' + line + '"');
  }
};
var killerRabbit = Object.create(protoRabbit);
killerRabbit.type = 'killer';
killerRabbit.speak('SKREEEEE!');

function Rabbit(type) {
  this.type = type;
}

var killerRabbit = new Rabbit('killer');
var blackRabbit = new Rabbit('black');
console.log(blackRabbit.type);

Rabbit.prototype.speak = function(line) {
  console.log('The ' + this.type + ' rabbit says "' + line + '"');
};

blackRabbit.speak('Doom...');

Rabbit.prototype.teeth = 'small';
console.log(killerRabbit.teeth);
killerRabbit.teeth = 'long, sharp and bloody';
console.log(killerRabbit.teeth);
console.log(blackRabbit.teeth);
console.log(Rabbit.prototype.teeth);

Rabbit.prototype.dance = function() {
  console.log('The ' + this.type + ' rabbit dances a jig.');
};

killerRabbit.dance();

// var map = {};
// function storePhi(event, phi) {
//   map[event] = phi;
// }

// storePhi('pizza', 0.069);
// storePhi('touched tree', -0.081);

Object.defineProperty(Object.prototype, 'hiddenNonsense',
                      {enumerable: false, value: 'hi'});

// for (var name in map)
//   console.log(name);
// console.log(map.hiddenNonsense);

var map = Object.create(null);
map['pizza'] = 0.069;
console.log('toString' in map);
console.log('pizza' in map);
