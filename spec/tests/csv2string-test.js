var assert = require('assert')

var csv2string = require('../../lib/csv2string.js')

var result = csv2string(1)
assert.equal(result, 1)

result = csv2string('1')
assert.equal(result, 1)

result = csv2string('val')
assert.equal(result, 'val')

result = csv2string('"val"')
assert.equal(result, 'val')

result = csv2string('"some, sentence, with, comma"')
assert.equal(result, 'some, sentence, with, comma')
