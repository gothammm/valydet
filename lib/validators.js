'use strict';
const is = require('is_js');
const R = require('ramda');
const get = (type) => {
  return registeredValidators[type] || is[type] || false;
};
const registeredValidators = {};
module.exports = {
  get: get,
  register: (key, fn) => {
    if (!R.is(String, key)) {
      return Promise.reject(`Key must be of type string`);
    }
    if (!R.is(Function, fn)) {
      return Promise.reject(`Invalid validator action.`);
    }
    registeredValidators[key] = fn;
    return Promise.resolve(true);
  }
};