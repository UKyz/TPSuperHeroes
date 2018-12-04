const chai = require('chai');

const {Villain} = require('../sls-villain/class/villain.js');

chai.should();

describe('new-hero.js', () => {
  const v1 = new Villain('Maxime');

  it('should create a villain', () => {
    v1.name.should.be.equal('Maxime');
    v1.speed.should.be.equal(0);
    v1.position.should.be.equal('Paris');
    v1.score.should.be.equal(0);
  });

  it('should change the score of a villain', () => {
    v1.noPainNoGain(10);
    v1.score.should.be.equal(10);
  });

  it('should change the position of a villain', () => {
    v1.changePosition('Lille');
    v1.position.should.be.equal('Lille');
  });

  it('should change the speed of a villain', () => {
    v1.setSpeed(5);
    v1.speed.should.be.equal(5);
  });
});

