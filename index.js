const rp = require('request-promise');

const newHero = name => {
  rp({method: 'POST', uri: 'http://localhost:3050/newHero',
    body: {name: `${name}`}, json: true})
    .then(hero => {
      rp({method: 'POST', uri: 'http://localhost:3010/newHero',
        body: hero, json: true}).then(res => console.log(res));
    });
};

const newVillain = name => {
  rp({method: 'POST', uri: 'http://localhost:3050/newVillain',
    body: {name: `${name}`}, json: true})
    .then(villain => {
      rp({method: 'POST', uri: 'http://localhost:3010/newVillain',
        body: villain, json: true}).then(res => console.log(res));
    });
};

const newCity = name => {
  rp({method: 'POST', uri: 'http://localhost:3050/newCity',
    body: {name: `${name}`}, json: true})
    .then(city => {
      rp({method: 'POST', uri: 'http://localhost:3010/newCity',
        body: city, json: true}).then(res => console.log(res));
    });
};

const newMount = name => {
  rp({method: 'POST', uri: 'http://localhost:3050/newMount',
    body: {name: `${name}`}, json: true})
    .then(city => {
      rp({method: 'POST', uri: 'http://localhost:3010/newMount',
        body: city, json: true}).then(res => console.log(res));
    });
};

const main = () => {
  newHero('Victor');
  newVillain('Maxime');
  newCity('Paris');
  newMount('Petit Tonnerre');
};

main();
