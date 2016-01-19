/* global it */
/* global describe */
'use strict';
const Chai = require('chai');
const expect = Chai.expect;
const valydet = require('../lib/valydet');


describe('default attribute test cases', () => {
  
  let UserSchema = new valydet.Schema({
    id: {
      type: 'alphaNumeric', default: 1, required: true
    },
    email: { type: 'email' },
    createdAt: { type: 'date', default: new Date(), required: true },
    updatedAt: { type: 'date', default: new Date(), required: true }
  });
  
  it('should set default of type Date', (done) => {
    let instance = UserSchema.validate({
      email: 'test@test.com'
    });
    let failures = instance.failures();
    expect(failures).to.not.be.undefined;
    expect(failures).to.not.be.null;
    expect(failures).to.have.length.of(0);
    done();
  });
});