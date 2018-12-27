const chai = require('chai');

const rp = require('request-promise');

chai.should();

describe('heroes', async () => {
  it('should be installed with a hero', async () => {
    await rp({method: 'POST', uri: 'http://localhost:3070/installHero'});
    const heroes = await rp(
      {method: 'GET', uri: 'http://localhost:3070/getHeroes', json: true});
    heroes.length.should.be.equal(1);
    heroes[0].name.should.be.equal('Robin');
    heroes[0].pos.should.be.equal('Paris');
  });

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

