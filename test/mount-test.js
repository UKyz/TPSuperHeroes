const chai = require('chai');

const {Mount} = require('./../sls-test/classes/mount.js');

chai.should();

describe('mount.js', () => {
  const mount = new Mount();

  it('should create a mount', () => {
    mount.name.should.be.equal('Tornado');
    mount.pos.should.be.equal('Paris');
    mount.speed.should.be.equal(50);
    mount.endurance.should.be.equal(100);
  });

  it('should change the postition of a mount', () => {
    mount.pos = 'Bruxelle';
    mount.pos.should.be.equal('Bruxelle');
  });

  it('should change the endurance of a mount', () => {
    mount.endurance -= 10;
    mount.endurance.should.be.equal(90);
  });
});

