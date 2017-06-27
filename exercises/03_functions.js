'use strict';

// Minimum

function min(a, b) {
  return (a > b) ? a: b;
}

console.log(min(10, -10));

// Recursion

function isEven(x) {
  if (x === 0) {
    return 'even';
  } else if (x === 1) {
    return 'odd';
  } else {
    return isEven(x - 2);
  }
}

console.log(isEven(101));

// Bean counting

function countB(s) {
  let BCount = 0;
  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) === 'B') {
      BCount += 1;
    }
  }
  return BCount;
}

console.log(countB('BaBaBooey'));

function charCount(s, c) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) === c) {
      count += 1;
    }
  }
  return count;
}

function reCountB(s) {
  return charCount(s, 'B');
}

console.log(reCountB('BaBadook'));