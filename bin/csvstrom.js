#!/usr/bin/env node
const csvstrom = require('../index.js')

const input = process.argv[2]

if (!input) {
  console.log(['Usage:', 'csvstrom input.csv [output.csv]'].join('\n'))
  process.exit(0)
}

const output = process.argv[3] || input.replace(/\.csv$/, '.json')
console.log({ input, output })

async function main() {
  console.time('CSVStrom :: Processing')
  await csvstrom(input, output)
  console.timeEnd('CSVStrom :: Processing')
}

main()
