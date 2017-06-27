'use strict';

// Sum of a range

function range(start, end, step) {
  step = (step != undefined) ? step : 1;
  let rangeArr = [];
  for (let i = start; i <= end; i += step) {
    rangeArr.push(i);
  }
  return rangeArr;
}

console.log(range(0, 10));

// Reversing an array

function reverseArray(arr) {
  let reversed = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }
  return reversed;
}

console.log(reverseArray([1, 2, 3, 4, 5]));

function reverseArrayInPlace(arr) {
  for (let i = 0; i < Math.floor(arr.length / 2); i ++){
    let swap = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = swap;
  }
  return arr;
}

console.log(reverseArrayInPlace([1, 2, 3, 4, 5]));

// A list

function arrayToList(arr) {
  let list = {}
  for (let i = 0; i < arr.length; i++) {
    
  }
}
