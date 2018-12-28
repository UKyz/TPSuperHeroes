const chai = require('chai');

const rp = require('request-promise');

chai.should();

describe('heroes', () => {
  it('should be installed with a hero', async () => {
    await rp({method: 'POST', uri: 'http://localhost:3070/installHero'});
    const heroes = await rp(
      {method: 'GET', uri: 'http://localhost:3070/getHeroes', json: true});
    heroes.length.should.be.equal(1);
    heroes[0].name.should.be.equal('Robin');
    heroes[0].pos.should.be.equal('Paris');
  });

  it('should add a ticket in hero\'s toDoList', async () => {
    const heroes = await rp(
      {method: 'GET', uri: 'http://localhost:3070/getHeroes', json: true});
    const hero = heroes[0];
    let toDoList = await rp({method: 'POST',
      uri: 'http://localhost:3070/getTickets', json: true,
      body: {idHero_: hero._id}});
    toDoList.length.should.be.equal(0);

    const cities = await rp(
      {method: 'GET', uri: 'http://localhost:3090/getCities', json: true});
    const city1 = (cities[0].name_ === 'Paris') ? cities[1] : cities[0];

    await rp({method: 'POST', uri: 'http://localhost:3070/addTicket',
      json: true,
      body: {idHero_: hero._id, idCity_: city1._id, duration_: 1.5}});
    toDoList = await rp({method: 'POST',
      uri: 'http://localhost:3070/getTickets', json: true,
      body: {idHero_: hero._id}});
    toDoList.length.should.be.equal(1);
    toDoList[0].duration_.should.be.equal(1.5);
    toDoList[0].idCity_.should.be.equal(city1._id);
  });

  /* -- it('should manage tickets of a hero', async () => {
    const heroes = await rp(
      {method: 'GET', uri: 'http://localhost:3070/getHeroes', json: true});
    console.log('heroes avant attente :');
    console.log(heroes);
    console.log(moment().format());
    heroes.length.should.be.equal(1);
    await new Promise (resolve => {
      setTimeout(async () => {
        console.log(moment().format());
        const heroes = await rp(
          {method: 'GET', uri: 'http://localhost:3070/getHeroes', json: true});
        console.log('heroes après attente :');
        console.log(heroes);
        resolve();
      }, 1500);
    });
  }); */

  it('should create a new hero', async () => {
    await rp({method: 'POST', uri: 'http://localhost:3070/newHero', json: true,
      body: {name: 'Superman'}});
    const heroes = await rp(
      {method: 'GET', uri: 'http://localhost:3070/getHeroes', json: true});
    heroes.length.should.be.equal(2);
    heroes[0].name.should.be.equal('Robin');
    heroes[0].pos.should.be.equal('Paris');
    heroes[1].name.should.be.equal('Superman');
    heroes[1].pos.should.be.equal('Paris');
  });
});

