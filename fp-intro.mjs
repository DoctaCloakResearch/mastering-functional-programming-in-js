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

function factorial(n, result = 0) {
  return (n === 0) ? 1 : n * factorial(n-1);
}

console.log(factorial(5));

