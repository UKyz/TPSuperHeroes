const rp = require('request-promise');

const fTest = () => {
  console.log('Là');
  rp({uri: 'http://localhost:3020/test',
    json: true}).then(res => console.log(res));
};

const main = async () => {
  await fTest();
};

main();
