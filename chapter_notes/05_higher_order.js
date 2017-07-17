'use strict';

const ancestry = JSON.parse(require('./ancestry.js'));

// Filtering

console.log(ancestry.filter(person => person.born > 1900 && person.born < 1925));

console.log(ancestry.filter(person => person.father == 'Carel Haverbeke'));

// Mapping

const overNinety = ancestry.filter(person => person.died - person.born > 90);
console.log(overNinety.map(person => person.name));

// Reducing

console.log(ancestry.reduce((min, cur) => {
  if (cur.born < min.born) return cur;
  else return min;
}));

// Composing with high-order functions

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

function age(p) { return p.died - p.born; }
function male(p) { return p.sex == 'm'; }
function female(p) { return p.sex == 'f' }

console.log(average(ancestry.filter(male).map(age)));
console.log(average(ancestry.filter(female).map(age)));

const byName = {};
ancestry.forEach(person => byName[person.name] = person);

function reduceAncestors(person, f, defaultValue) {
  function valueFor(person) {
    if (person == null)
      return defaultValue;
    else
      return f(person, valueFor(byName[person.mother]),
                       valueFor(byName[person.father]));
  }
  return valueFor(person);
}

function sharedDNA(person, fromMother, fromFather) {
  if (person.name == 'Pauwels van Haverbeke')
    return 1;
  else
    return (fromMother + fromFather) / 2;
}
var ph = byName['Philibert Haverbeke'];
console.log(reduceAncestors(ph, sharedDNA, 0) / 4);

var theSet = ["Carel Haverbeke", "Maria van Brussel", "Donald Duck"];
function isInSet(set, person) {
  return set.indexOf(person.name) > -1;
}

console.log(ancestry.filter(person => isInSet(theSet, person)));

console.log(ancestry.filter(isInSet.bind(null, theSet)));