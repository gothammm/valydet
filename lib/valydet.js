'use strict';
const validators = require('./validators');
module.exports = {
  Schema: require('./schema'),
  Validator: {
    register: validators.register,
    get: validators.get 
  }
};