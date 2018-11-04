const rp = require('request-promise');

rp('http://localhost:1337/add?var1=2&var2=3')
  .then((body) => {console.log(body)});