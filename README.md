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
console.log(result.failures());

```

# API

## new valydet.Schema(schemaDefinition)
 - Generates a new schema for the given schema definition
 - **Params**
   - **schemaDefinition** - Schema Definition containing the rules.
     - Uses [is.js](https://arasatasaygin.github.io/is.js/) for validation each attribute.
     
**Usage:**
```javascript
const valydet = require('valydet');
const SomeSchema = new valydet.Schema({
  id: { type: 'string',
   required: true,
   // You can have custom error message to override
   // the default message. 
   message: 'Custom error message' 
  },
  email: { type: 'email': required: true }
});
 ```
 
## schemaInstance.validate(data)
 
 - Validates the supplied data against the schema definition.
 - **returns**: [] of errors

 
## schemaInstance.failures()
 
 - **returns**: list of errors

  ```javascript
    // error format
    {
      key: 'id' // property name.,
      message: 'Something went wrong' // Error message.
    } 
  ```
