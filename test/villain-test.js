const chai = require('chai');

const rp = require('request-promise');

chai.should();

describe('villains', async () => {
  it('should create a new villain', async () => {
    await rp({
      method: 'POST', uri: 'http://localhost:3060/newVillain',
      json: true, body: {name: 'Maïdi', city: 'Paris'}
    });
    const villains = await rp(
      {method: 'GET', uri: 'http://localhost:3060/getVillains', json: true});
    villains.length.should.be.not.equal(0);
    villains[0].name_.should.be.equal('Maïdi');
    villains[0].pos_.should.be.equal('Paris');
    const villainsByCities = await rp(
      {
        method: 'POST', uri: 'http://localhost:3060/countVillainsByCities',
        json: true, body: villains
      });
    villainsByCities[0].name.should.be.equal('Paris');
    villainsByCities[0].score.should.be.equal(1);
  });

  it('should delete all villains', async () => {
    await rp({method: 'POST', uri: 'http://localhost:3060/deleteVillainsInCity',
      json: true, body: {city: 'Paris'}});
    const villains = await rp(
      {method: 'GET', uri: 'http://localhost:3060/getVillains', json: true});
    villains.length.should.be.equal(0);
  });
});

