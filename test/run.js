const assert = require('assert')
const fs = require('fs')
const csvstrom = require('../index.js')
const root = process.cwd() + '/test'
const input = `${root}/nace-codes.csv`
const output = `${root}/nace-codes.json`

async function main() {
  console.time('Processing')
  const { count } = await csvstrom(input, output)
  console.timeEnd('Processing')
  console.log(`Processed ${count} lines`)
  const data = fs.readFileSync(output)
  const json = JSON.parse(data)
  assert.ok(json[0])
}

main()
