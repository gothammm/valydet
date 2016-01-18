/* global it */
/* global describe */
'use strict';
const Chai = require('chai');
const expect = Chai.expect;
const valydet = require('../lib/valydet');

describe('test basic cases', () => {
  let PostSchema = new valydet.Schema({
    id: {
      type: 'string', required: true
    },
    email: { type: 'email' }
  });

  let CommentSchema = new valydet.Schema({
    id: {
      type: 'number', required: true
    },
    message: { type: 'string' },
    code: { type: 'alphaNumeric' }
  });
  
  
  it('should be of type utyl.Schema', (done) => {
    expect(PostSchema).instanceof(valydet.Schema);
    expect(CommentSchema).instanceof(valydet.Schema);
    done();
  });
  
  it('should have error - "id" is required', (done) => {
    let instance = PostSchema.validate({
      id: '',
      email: 'test@test.com'
    });
    let failures = instance.failures();
    expect(failures).to.have.length.of.at.least(1);
    expect(failures[0]).to.have.ownProperty('key');
    expect(failures[0].key).to.equal('id');
    done();
  });

  it('should validate email type', (done) => {
    let instance = PostSchema.validate({
      id: 'testId',
      email: 'testtest.com'
    });
    let failures = instance.failures();
    expect(failures).to.have.length.of.at.least(1);
    expect(failures[0]).to.have.ownProperty('key');
    expect(failures[0].key).to.equal('email');
    done();
  });

  it('should validate number type', (done) => {
    let instance = CommentSchema.validate({
      id: 'invalid_id',
      message: 'Something'
    });
    let failures = instance.failures();
    expect(failures).to.have.length.of.at.least(1);
    expect(failures[0]).to.have.ownProperty('key');
    expect(failures[0].key).to.equal('id');
    done();
  });

  it('should fail validation for code property - CommentSchema', (done) => {
    let instance = CommentSchema.validate({
      id: 12312,
      message: 'something',
      code: '!@#%!!@#'
    });
    let failures = instance.failures();
    expect(failures).to.have.length.of.at.least(1);
    expect(failures[0]).to.have.ownProperty('key');
    expect(failures[0].key).to.equal('code');
    done();
  });
});