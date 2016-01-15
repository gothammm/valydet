/* global it */
/* global describe */
'use strict';
const Chai = require('chai');
const expect = Chai.expect;
const valydet = require('../lib/valydet');

describe('test nested object cases', () => {
  let CommentSchema = new valydet.Schema({
    commentId: { type: 'alphaNumeric', required: true },
    postedAt: { type: 'date', required: true }
  });
  let UserSchema = new valydet.Schema({
    id: { type: 'number', required: true },
    comments: { type: CommentSchema, required: true }
  });
  
  it('should validate commentId of comment schema', (done) => {
    let user = UserSchema.validate({
      id: 1,
      comments: {
        commentId: '!@!%'
      }
    });
    
    let failures = user.failures();
    expect(failures).to.have.length.of.at.least(2);
    expect(failures[0]).to.have.ownProperty('key');
    expect(failures[0].key).to.equal('commentId');
    expect(failures[1]).to.have.ownProperty('key');
    expect(failures[1].key).to.equal('postedAt');
    done();
  });
  
  it('should pass validation - comment schema', (done) => {
    let user = UserSchema.validate({
      id: 1,
      comments: {
        commentId: 'A177s',
        postedAt: new Date()
      }
    });
    let failures = user.failures();
    expect(failures).to.have.length(0);
    done();
  });
});