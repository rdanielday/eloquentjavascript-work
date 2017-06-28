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
  let list = null;
  for (let i = arr.length - 1; i >= 0; i--) {
    list = {
      value: arr[i],
      rest: list
    };
  }
  return list;
}

const testArr = [1, 2, 3];
const testList = arrayToList(testArr);
console.log(testList);

function listToArray(list) {
  let arr = [];
  for (let node = list; node; node = node.rest) {
    arr.push(node.value)
  }
  return arr;
}

const newArr = listToArray(testList);
console.log(newArr);

function prepend(el, list) {
  el.rest = null;
  for (let node = list; node; node = node.rest) {
    if (node.rest == null) {
      node.rest = el;
      return list;
    }
  }
}

const newList = prepend({value: 'cat'}, testList);
console.log(newList);

function nth(list, num) {
  if (list.value === num) {
    return list;
  } else if (list.rest != null) {
    return nth(list.rest, num);
  }
}

const found = nth(testList, 3);
console.log(found);

// Deep comparison

function deepEqual(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  } else {
    for (let key in obj1) {
      if (obj2.hasOwnProperty(key)) {
        if (typeof obj1[key] == 'object' && obj1[key] != null) {
          return deepEqual(obj1[key], obj2[key]);
        } else if (obj1[key] !== obj2[key]) {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  }
}

const obj1 = {this: 'is', an: 'object', a: {cat: 'was', here: 'today'}};
const obj2 = {and: 'another', object: {over: 'here'}, but: 'more!'};
const obj3 = {this: 'is', an: 'object', a: {cat: 'had!', here: 'today'}};

const obj = {here: {is: "an"}, object: 2};

console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
