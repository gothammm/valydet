'use strict';
const R = require('ramda');
const validators = require('./validators');
const is = require('is_js');

class Schema {
  constructor(definition) {
    if (!R.is(Object, definition)) {
      throw new Error('Invalid schema definition');
    }
    this.def = definition;
    this.errors = [];
    this.path = '';
  }
  failures() {
    var failuresList = R.clone(this.errors);
    this.errors = [];
    return failuresList;
  }
  validate(data, def) {
    let _self = this;
    let _def = def || _self.def;
    _def = _def instanceof Schema ? _def.def : _def;
    _self._data = _self.data || data;
    R.mapObjIndexed((val, key) => {
      let type = val.type || 'string';
      let isRequired = val.required || false;
      let customValidator = val.validator || null;
      let regex = val.regex || null;
      let result = true;
      let value = data[key] || (val.default instanceof Function ? val.default() : val.default || null);
      let message = val.message || `${key} expected to be of type ${type} but got ${value} instead`;
      if (isRequired &&
        (
          (is.empty(value) && !is.date(value))
          ||
          is.undefined(value)
          ||
          is.null(value)
          )
        ) {
        _self.errors.push({
          key: key,
          value: value,
          message: val.message || `${key} value cannot be empty`
        });
        return;
      } else if (!isRequired && (is.empty(value) || is.undefined(value) || is.null(value))) {
        return;
      }
      if (type === 'array') {
        if (!R.isArrayLike(value)) {
          result = false;
        } else {
          let ofType = val.of || 'string';
          for (var i = 0, length = value.length; i < length; i++) {
            let subDoc = value[i];
            if (R.is(Object, subDoc)) {
              if (val === 'object') {
                result = true;
              } else {
                _self.validate(subDoc, ofType);
              }
            } else {
              let validator = validators.get(ofType);
              result = validator && validator(subDoc);
              if (!result) {
                _self.errors.push({
                  key: key,
                  value: subDoc,
                  message: val.message || `Expected ${key}[${i}] to be ${ofType} but got ${subDoc}`
                });
              }
            }
          }
        }
      } else if (R.is(Object, type)) {
        _self.validate(value, type);
      } else if (regex) {
        result = regex.test(value);
        message = val.message || `${key} does not match the expression ${regex}`;
      } else if (customValidator) {
        result = customValidator(value, key);
      } else {
        let validator = validators.get(type);
        result = validator && validator(value);
      }
      if (!result) {
        _self.errors.push({
          key: key,
          value: value,
          message: message
        });
      }
    }, _def);
    return _self;
  }
  get() {
    let _self = this;
    return Schema._getData(_self._data, _self.def);
  }
  static _getData(uData, def) {
    let newData = {};
    let currData = uData || {};
    R.mapObjIndexed((val, key) => {
      if (R.is(Object, val.type)) {
        newData[key] = Schema._getData(currData, val.type);
      } else {
        newData[key] = currData[key] || (val.default instanceof Function ? val.default() : val.default || null);
      }
    }, def);
    return newData;
  }
  static validate(data, type) {
    let validator = validators.get(type);
    return validator && validator(data);
  }
}

module.exports = Schema;