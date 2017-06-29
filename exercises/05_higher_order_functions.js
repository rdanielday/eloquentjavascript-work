'use strict';

// Flatten an array

var arrays = [[1, 2, 3], [4, 5], 6]

const reduced = arrays.reduce(function(a, b) {
  return a.concat(b);
}, []);

console.log(reduced);

// Mother-child age difference

const ancestry = JSON.parse(require('../chapter_work/ancestry.js'));

const byName = {};
ancestry.forEach(person => byName[person.name] = person);

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var daughtersWithMothers = ancestry.filter(person => person.sex == 'f').filter(daughter => byName.hasOwnProperty(daughter.mother));
var difference = [];

daughtersWithMothers.forEach(daughter => {
  var mother = byName[daughter.mother];
  var ageDifference = daughter.born - mother.born;
  difference.push(ageDifference);
});

console.log(average(difference));

// Historical life expectancy

function centurySort(arr) {
  var centuries = {
    16: [],
    17: [],
    18: [],
    19: [],
    20: [],
    21: []
  };

  arr.forEach(person => {
    switch (Math.ceil(person.died / 100)) {
      case 16:
        centuries[16].push(person.died - person.born);
        break;
      case 17:
        centuries[17].push(person.died - person.born);
        break;
      case 18:
        centuries[18].push(person.died - person.born);
        break;
      case 19:
        centuries[19].push(person.died - person.born);
        break;
      case 21:
        centuries[20].push(person.died - person.born);
        break;
      case 21:
        centuries[21].push(person.died - person.born);
        break;
      default:
        break;
    }
  });
  return centuries;
}

var centuryAges= centurySort(ancestry);

console.log(centuryAges);

var eighteen = average(centuryAges[18]);

console.log(eighteen)

// Every and then some

function every(arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    if (!(fn(arr[i]))) return false;
  }
  return true;
}

var testArr = ['cat', 'pants', 1];
console.log(every(testArr, function(i) {
  return typeof i == 'string';
}));

function some(arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i])) return true;
  }
  return false;
}

console.log(some(testArr, function(i) {
  return typeof i == 'string';
}));
