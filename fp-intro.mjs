import { default as readlineSync } from 'readline-sync';
const input = (context) => readlineSync.question(context);
/* 
  At a high level, FP focuses on what should be done, rather than on how.
  This makes code simpler, shorter, more elegant, and can easily
  be tested and debugged.

  React is an example of a framework that includes FP ideas. The view is 
  nothing more than a function of the current state. You use a function
  to compute what HTML and CSS must be produced at each moment.

  Similarly, in Redux you get the concept of actions that are processed by
  reducers.  An action provides some data, while a reducer is a function that
  produces new state off of the current state and provided data.

  Place an emphasis on the following:

  Modularity: The functionality of a program should be split into independent
  modules, each containing only the code necessary to perform one aspect
  of the program.  Changes in a module should not affect the rest of the code.

  Understandable: The components of a program should be easy to identify. This
  is linked to maintainability—code will have to be maintained at some point 
  in the future.

  Testable: There should be unit tests to try out small parts of your program,
  verifying their behavior with independence of the rest of the code.
  Also, unit tests are like a form of documentation, in the sense that they
  should help readers understand what the code is supposed to do.

  Extensible: Someday code will require maintenance.  These changes should 
  only impact minimally (if at all) the structure and data flow
  of the original code.

  Reusable: Code reuse basically has the goal of saving resources, time, money,
  and reducing redunancy.  Modularity helps with this, plus high cohesion (all
  piece in a module do belong together), low coupling (modules are
  independent of each other), separation of concerns, and information
  hiding (internal changes in a module shouldn't affect the rest of the program)
*/

// Functions as first class objects/citizens
var computeSuccess = function(result = '', status) {
  return (status == 200) ? 'Success' : 'Failure';
}
var isSuccess = computeSuccess(false, 200);

console.log(isSuccess);

/* Recursion
  Recursion in general is great for developing algorithms and is a big aid in
  solving a large class of problems.  You basically have a function that can
  call itself at a certain point, and when that call is done, a program
  can continue working with whatever result it has received.

  You often use recursion when dealing with factorial for example.
  if n is 0 then n!=1, otherwise if n is greater than 0, then n! = n * (n-1)!
*/

function factorial(n) {
  return (n === 0) ? 1 : n * factorial(n-1);
}

console.log(factorial(5));

/* Closures
  Closuers are a way to utilize data hiding with private variables, this is how
  we are able to utilize modules and other nice features in JavaScript.  The
  primary concept is that when you define a function, it can refer to noy only
  its own local variables, but also to everything otuside of its context.

  Below is a poor example of a closure.  Better examples would be
  pure functions, or higher order functions, as well as the module pattern.
*/

function newCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  }
}
const nc = newCounter();
console.log(nc()); // 1
console.log(nc()); // 2
console.log(nc()); // 3

/* Arrow functions
  In JavaScript, arrow functions are just a concise, more succint way of
  creating an unnamed/anonymous function.  They can be used pretty much
  anywhere that a regular function can be used, minus constructors.
*/
const refactoredFactorial = (n) => (n === 0) ? 1 : n * factorial(n - 1);
console.log(refactoredFactorial(5));

/* Spread
  The spread operator is great for expanding an expression in places where
  one may otherwise require multiple arguments, elements, or variables.
*/

var x = [1, 2, 3];
function sum3(a, b, c) {
  return a + b + c;
}
var y = sum3(...x); // equivalent to sum3(1, 2, 3);
console.log(y); // 6

function sum(numbers) {
  var total = 0;
  for (var num of numbers) {
    total += num;
  }
  return total;
}
var zNumbers = [1, 2, 3, 4, 5, 6]
var z = sum(zNumbers);
console.log(z);

// You can also create or join arrays
var f = [1, 2, 3];
var g = [4, ...f, 5]; // [4, 1, 2, 3, 5];
var h = [...f, ...g]; // [1, 2, 3, 4, 1, 2, 3, 5,]
console.log(g);
console.log(h);

// Spread works with objects too:
var p = { some: 3, data: 5};
var q = { more: 8, ...p } // more: 8, some: 3, data: 5
console.log(q);

// You can even use spread to work with functions that expect separate params
// h was declared above in case you forgot, it's storing an array of numbers.
var minA = Math.min(...h); // 1
var maxA = Math.max(...h); // 5
console.log(`The minimum number: ${minA}`);
console.log(`The maximum number ${maxA}`);

const makeSaluteClass = term => 
  class {
    constructor(x) {
      this.x = x;
    }

    salute(y) {
      console.log(`${this.x} says "${term}" to ${y}`);
    }
  };

  const Spanish = makeSaluteClass("HOLA");
  new Spanish("ALFA").salute("BETA");
  // ALFA says "HOLA" to BETA

  new(makeSaluteClass("HELLO"))("GAMMA").salute("DELTA");
  // GAMMA says "HELLO" to DELTA

  const fullSalute = (c, x, y) => new c(x).salute(y);
  const French = makeSaluteClass("BON JOUR");
  fullSalute(French, "EPSILON", "ZETA");
  // EPSILON says "BON JOUR" to ZETA