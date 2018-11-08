const chai = require('chai');

const {Hero} = require('./../hero/hero.js');

chai.should();

describe('hero.js', () => {
  const h1 = new Hero('Robin');

  it('should create a hero', () => {
    h1.name.should.be.equal('Robin');
    h1.speed.should.be.equal(0);
    h1.position.should.be.equal('Paris');
    h1.score.should.be.equal(0);
  });

  /* -h1.noPainNoGain(10);
  h1.changePosition('Lille');
  h1.setSpeed(5);

  it('should change values of a hero', () => {
    h1.speed.should.be.equal(5);
    h1.position.should.be.equal('Lille');
    h1.score.should.be.equal(10);
  }); */
});

