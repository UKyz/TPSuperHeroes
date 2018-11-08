const chai = require('chai');

const {Villain} = require('./../villain/villain.js');

chai.should();

describe('villain.js', () => {
  const v1 = new Villain('Maxime');

  it('should create a villain', () => {
    v1.name.should.be.equal('Maxime');
  });
});

