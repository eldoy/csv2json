var assert = require('assert')
var fs = require('fs')
var csvstrom = require('../../index.js')
var root = process.cwd() + '/spec/data'
var input = `${root}/nace-codes.csv`
var output = `${root}/nace-codes.json`

async function main() {
  var { count } = await csvstrom(input, output)

  var data = fs.readFileSync(output)
  var result = JSON.parse(data)[0]
  assert.ok(result.code == '1')
}

main()
