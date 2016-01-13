'use strict';
const is = require('is_js');
const get = (type) => {
  return is[type] || (() => true);
};

module.exports = {
  get: get,
  register: () => {}
};