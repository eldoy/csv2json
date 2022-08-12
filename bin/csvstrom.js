const assert = require('assert')
const csvstrom = require('../index.js')

const input = process.argv[2]

if (!input) {
  console.log(['Usage:', 'csvstrom input.csv [output.csv]'].join('\n'))
  process.exit(0)
}

const output = process.argv[3] || input.replace(/\.csv$/, '.json')
console.log({ input, output })

async function main() {
  console.time('Processing')
  await csvstrom(input, output)
  console.timeEnd('Processing')
}

main()
