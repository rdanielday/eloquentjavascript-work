'use strict';

// Looping a triangle

let hash = '#';
for (let i = 0; i < 7; i++) {
  console.log(hash);
  hash += '#';
}

// FizzBuzz

for (let i = 1; i <= 100; i ++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log('FizzBuzz');
  } else if (i % 5 === 0) {
    console.log('Buzz');
  } else if (i % 3 === 0) {
    console.log('Fizz');
  } else {
    console.log(i);
  }
}

// Chess board


function checker(num) {
  let board = '';
  for (let i = 0; i < num; i++) {
    let row = '';
    if (i % 2 === 0) {
      for (let j = 0; j < num; j++) {
        if (j % 2 === 0) {
          row += ' ';
        } else {
          row += '#';
        }
      }
    } else {
      for (let j = 0; j < num; j++) {
        if (j % 2 !== 0) {
          row += '#';
        } else {
          row += ' ';
        }
      }
    }
    row += '\n';
    board += row;
  }
  return board;
}

console.log(checker(10));