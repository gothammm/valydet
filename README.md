# Valydet

- A tiny module to validate JSON data.

## Status
[![Build Status](https://travis-ci.org/peek4y/valydet.svg?branch=master)](https://travis-ci.org/peek4y/valydet)

## Usage

```javascript
const valydet = require('valydet');
const PostSchema = new valydet.Schema({
  id: { type: 'string', required: true },
  title: { type: 'string', required: true },
  by: { type: 'email', required: true }
});

// Validate data.
let result = PostSchema.validate({
  id: 'testId',
  title: '',
  by: 'invalidemail'
});

// access errors list
console.log(result.errors);

```