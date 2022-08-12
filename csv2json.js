const { read, write } = require('extras')

const input = process.argv[2]

if (!input) {
  console.log(['Usage:', 'csv2json input.csv [output.csv]'].join('\n'))
  process.exit(0)
}

const output = process.argv[3] || input.replace(/\.csv$/, '.json')
console.log({ input, output })

const csv = read(input)
const lines = csv.split('\n')
const fields = lines
  .shift()
  .split(';')
  .map((x) => x.trim())

if (!fields.length) {
  console.log('No fields found on first line.')
  process.exit(0)
}

const result = []
for (const line of lines) {
  const values = line.split(';').map((x) => x.trim())
  const obj = {}
  for (let i = 0; i < fields.length; i++) {
    obj[fields[i]] = values[i]
  }
  result.push(obj)
}

console.log(result)
write(output, JSON.stringify(result, null, 2))
