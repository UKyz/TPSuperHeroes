const rp = require('request-promise');

const add = (var1, var2, server) => {
  rp(`http://localhost:${server}/add?var1=${var1}&var2=${var2}`)
    .then(body => {
      console.log(body);
    });
};

add(2, 3, 1338);

add(2, 3, 1337);

rp(`http://localhost:1337/create?var1=Alexia&var2=23`)
  .then();

rp(`http://localhost:1337/tab`)
  .then(body => {
    console.log(body);
  });
