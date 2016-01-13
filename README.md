# Valydet

- A tiny module to validate JSON data.

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