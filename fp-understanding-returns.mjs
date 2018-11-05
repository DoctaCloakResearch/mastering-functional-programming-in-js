'use-strict';

const returnFunction = (function() {
  return function(name ='John Doe') {
    return name;
  }
}());

// This is immediately invoked with 2 being set as numOne.
const returnFunctionAddTwo = (function(numOne = 2) {
  return function(numTwo) {
    return numOne + numTwo;
  }
}());

const addTwoFlexible = function(numOne) {
  return function(numTwo) {
    return numOne + numTwo;
  }
}

console.log(returnFunction('Christopher'));
console.log(returnFunctionAddTwo(8));
console.log(addTwoFlexible(40 ** 2)(2));