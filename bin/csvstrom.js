#!/usr/bin/env node
var csvstrom = require('../index.js')

var input = process.argv[2]

if (!input) {
  console.log(['Usage:', 'csvstrom input.csv [output.json]'].join('\n'))
  process.exit(0)
}

var output = process.argv[3] || input.replace(/\.csv$/, '.json')
console.log({ input, output })

async function main() {
  console.time('CSVStrom :: Processing')
  await csvstrom(input, output)
  console.timeEnd('CSVStrom :: Processing')
}

main()
