/* global it */
/* global describe */
'use strict';
const Chai = require('chai');
const expect = Chai.expect;
const valydet = require('../lib/valydet');

describe('check required attribute', () => {
  let PostSchema = new valydet.Schema({
    id: { 
      type: 'string', required: true
    },
    email: { type: 'email' }
  });
  
  it('should have error - "id" is required', (done) => {
    let instance = PostSchema.validate({
      id: '',
      email: 'test@test.com'
    });
    expect(instance.errors).to.have.length.of.at.least(1);
    expect(instance.errors[0]).to.have.ownProperty('key');
    expect(instance.errors[0].key).to.equal('id');
    done();
  });
  
  it('should have error - invalid "email"', (done) => {
    let instance = PostSchema.validate({
      id: 'testId',
      email: 'testtest.com'
    });
    expect(instance.errors).to.have.length.of.at.least(2);
    expect(instance.errors[1]).to.have.ownProperty('key');
    expect(instance.errors[1].key).to.equal('email');
    done();
  });
});