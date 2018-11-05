'use-strict';

// Better callbacks with closure
import fs from 'fs';

let users = [
  { username: 'yogaMum1975', password: 'powerOfLove1234'},
  { username: 'butterfly_sprinkle', password: 'godislove!cupcakesarelife'},
  { username: 'dogFightDynoTractR', password: 'bigexplosion2'},
  { username: 'care_freeCathy', password: 'awesomepassword123'},
];

let printResults = function(secret) {
  console.log(secret);
}

let callback = function(err, response) {
  if(err) { throw new Error(err); }
  let data = JSON.parse(response);
  let secret = data['secret'];
  printResults(secret);
}

let getSecret = function(users) {
  users.map((user) => {
    fs.readFile(`./database_simple/${user.username}.json`, 'utf8', callback)
  });
}

getSecret(users);
