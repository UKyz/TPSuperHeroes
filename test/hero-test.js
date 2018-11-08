const chai = require('chai');

const {Hero} = require('./../hero/hero.js');

chai.should();

describe('hero.js', () => {
  const v1 = new Hero('Robin');

  it('should create a hero', () => {
    v1.name.should.be.equal('Robin');
  });
});

