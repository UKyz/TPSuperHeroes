const rp = require('request-promise');

const add = (var1, var2) =>{
  rp(`http://localhost:1338/add?var1=${var1}&var2=${var2}`)
    .then((body) => {console.log(body)});
};

add(2, 3);