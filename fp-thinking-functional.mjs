/*
  Possible solutions for solving a web e-commerce checkout.

  A user must be able to click a bill me button at the end of their shopping
  experience, so their credit card will be charged.  However, the user
  shouldn't click twice (or more) or they would be billed several times.

  HTML Part: 
  <button id="billButton" onclick="billTheUser(some,sales,data)">
    Bill Me
  </button>
*/

/* Solution #1 — Hope for the best
  The first solution could be telling the user NOT to click twice, and hope
  for the best.  This is a terrible idea and a lot of websites do this 
  unfortunately.
*/

/* Solution #2 — Use a global flag
  The second solution, which is one most people may think of is using a global
  variable to record whether the user has already clicked on the button.

  This is not a good idea though, because global variables are frowned upon.
  
  One, global variables can be read and modified by any part of a program, this
  makes it very difficult to reason about every possible use.

  Namespace pollution, memory allocation issues, testing being more difficult,
  implicit coupling, and concurrency issues are more things to worry about
  with this solution.
*/

// This flag is turned to true once the user clicks on the button for the first
// time, then the function is invoked, otherwise nothing happens at all.
let clicked = false;

// function billTheUser(some, sales, data) {
//   if (!clicked) {
//     clicked = true;
//     window.alert("Billing the user.");
//     // some code to bill the user.  Maybe activating a process on the backend
//     // that utilizes Stripe or some payment platform.
//   }
// }

/* Solution 3 — Remove the handler
  This is more of a lateral solution.  Instead of having the function avoid
  repeated clicks, you can just remove the possibility of clicking altogether.

  i.e. 
  function billTheUser(some, sales, data) {
    document.getElementById("billButton").onclick = null;
    window.alert("Billing the user.");
    // some code to bill the user.  Maybe activating a process on the backend
    // that utilizes Stripe or some payment platform.
  }

  The solution is not without issues though.  The code is tightly coupled
  to the button, so you won't be able to reuse it elsewhere.

  Not only that, you have to remember to reset the handler, otherwise the user
  won't be able to make a second buy.

  Lastly, testing will be more difficult because you'll have to provide
  DOM elements when writing your test.

  You can enhance this solution a tiny bit, though, by providing an ID
  as an exra argument in the call.

  HTML:
  <button id+"billbutton" onclick="billTheUser('billButton', some, sales, data")>
    Bill Me
  </button>

  JS:
  function billTheUser(buttonId, some, sales, data) {
    document.getElementById(buttonId).onclick = null;
    clicked = true;
    window.alert("Billing the user.");
  }

  This is a little better, but we are still using a global element: not a 
  variable, but the onclick value.  So it's still not a very good solution
  either.
*/

/* Solution 4 — Change the handle
  A variant would be to not remove the click function, and rather assign a new
  one instead.

  The nice thing about this solution is that if the user clicks a second time,
  they will get a warning not to do that again and they also won't be billed
  again either.

  This is good UX but the same problem exists as the previous one.

  The code is coupled to the button, the handler needs resetting, also
  this means harder testing because we'll ned HTML to run this test.
*/

function alreadyBilled() {
  window.alert("Your billing process is running; don't click, please");
}

// function billTheUser(some, sales, data) {
//   document.getElementById("billButton").onclick = alreadyBilled;
//   window.alert("Billing the user...");
//   // actually begin billing the user
// }

/* Solution 5 — Disable the button
  This is another option.  Instead of removing the event handler, you could
  disable the button altogether, so the user won't be able to click.

  But it's still coupling the code to the button HTML element inside
  the function.  This will make it tough to test and we still have to re-enable
  the button too.  So it's a bad solution for our use case.
*/

// function billTheUser(some, sales, data) {
//   document.getElementById("billButton").setAttribute("disabled", "true");
//   window.alert("Billing the user...");
//   // actually bill the user
// }

/* Solution 6 — Redefine the handler
  Instead of changing anythign in hte button another option is to let the
  event handler change itself.

  By assigning a new value to the billTheUser variable, we are actually
  dynamically changing what the function does.

  This solution is still difficult to test though.  Even worse, restoring it
  back to its original state is not possible.
*/

// function billTheUser(some, sales, data) {
//   billTheUser = function() {};
//   window.alert("Billing the user...");
//   // actually bill the user
// }

/* Solution 7 — Use a local flag
  We could go back to square one and use a flag, but this time make it local
  instead of global.

  Furthermore, we could make it an immediately invoked function expression.
  With this we can use a closure, so clicked will be local to the function,
  and not visible anywhere else.
*/
var billTheUser = (clicked => {
  return (some, sales, data) => {
    if (!clicked) {
      clicked = true;
      window.alert("billing the user...");
      // actually bill the user
    }
  };
})(false);
