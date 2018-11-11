const rp = require('request-promise');

const newHero = (name, age) => {
  rp(`http://localhost:3020/createNewHero?name=${name}&age=${age}`);
};

const newVillain = (name, age) => {
  rp(`http://localhost:3010/createNewVillain?name=${name}&age=${age}`);
};

const getVillains = () => {
  rp({uri: 'http://localhost:3010/getListVillains', json: true})
    .then(body => {
      console.log(body.result);
    });
};

const getHeroes = () => {
  rp({uri: 'http://localhost:3020/getListHeroes', json: true})
    .then(body => {
      console.log(body.result);
    });
};

const getCities = () => {
  rp({uri: 'http://localhost:3030/getListCities', json: true})
    .then(body => {
      console.log(body.result);
    });
};

const getLocalizationCity = city => {
  rp({uri: `http://localhost:3030/getLocalizationCity?name=${city}`,
    json: true})
    .then(body => {
      console.log(body.result);
    });
};

const main = () => {
  newHero('Alexia', '23');
  getHeroes();
  newVillain('Pas Beau', '104');
  getVillains();
  getCities();
  getLocalizationCity('Brest');
};

main();
