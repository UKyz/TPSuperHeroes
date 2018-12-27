const chai = require('chai');

const rp = require('request-promise');

chai.should();

describe('cities', async () => {
  it('should be installed with 10 cities', async () => {
    await rp({method: 'POST', uri: 'http://localhost:3090/installCities'});
    const cities = await rp(
      {method: 'GET', uri: 'http://localhost:3090/getCities', json: true});
    cities.length.should.be.equal(10);
    const cityTest = cities[0];
    const cityToTest = await rp(
      {method: 'POST', uri: 'http://localhost:3090/getCity', json: true,
        body: {idCity: cityTest._id}});
    cityToTest._id.should.be.equal(cityTest._id);
    cityToTest.name_.should.be.equal(cityTest.name_);
    cityToTest.latitude_.should.be.equal(cityTest.latitude_);
    cityToTest.longitude_.should.be.equal(cityTest.longitude_);
  });
});

