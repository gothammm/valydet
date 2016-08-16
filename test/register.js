/* global it */
/* global describe */
'use strict';
const Chai = require('chai');
const expect = Chai.expect;
const valydet = require('../lib/valydet');
const validator = valydet.Validator;

describe('register custom validators', () => {
  it('should fail while registering with invalid key', done => {
    let isRegistered = validator.register(1, val => val instanceof String);
    isRegistered.catch(err => {
      expect(err.toLowerCase()).to.be.equal('key must be of type string');
      expect(err).to.not.be.null;
      return done();
    });
  });

  it('should register a custom validator', done => {
    validator.register('number-x', (val) => val instanceof Number);
    expect(validator.get('number-x')).to.be.an.instanceof(Function);
    return done();
  });
});