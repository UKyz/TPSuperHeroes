const chai = require('chai');

const {Hero} = require('../sls-hero/class/hero.js');

chai.should();

describe('hero.js', () => {
  const h1 = new Hero('Robin');

  it('should create a hero', () => {
    h1.name.should.be.equal('Robin');
    h1.speed.should.be.equal(0);
    h1.position.should.be.equal('Paris');
    h1.score.should.be.equal(0);
  });

  it('should change the score of a hero', () => {
    h1.noPainNoGain(10);
    h1.score.should.be.equal(10);
  });

  it('should change the position of a hero', () => {
    h1.changePosition('Lille');
    h1.position.should.be.equal('Lille');
  });

  it('should change the speed of a hero', () => {
    h1.setSpeed(5);
    h1.speed.should.be.equal(5);
  });
});

