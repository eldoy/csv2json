var fs = require('fs')
var readline = require('readline')

var getCount = require('./lib/getCount.js')
var csv2string = require('./lib/csv2string.js')

module.exports = async function (input, output) {
  if (!output) {
    output = input.replace(/\.csv$/, '.json')
  }
  var fields,
    total,
    count = 0

  total = await getCount(input)

  return new Promise(function (resolve) {
    var rl = readline.createInterface({
      input: fs.createReadStream(input),
      output: fs.createWriteStream(output)
    })

    rl.on('line', function (line) {
      if (!line.trim()) return
      count++
      var values = line.split(';').map((x) => x.trim())
      if (!fields) {
        rl.output.write(`[\n`)
        fields = values
      } else {
        var item = {}
        for (var i = 0; i < fields.length; i++) {
          item[fields[i]] = csv2string(values[i])
        }
        var result = JSON.stringify(item, null, 2)
          .split('\n')
          .map((x) => `  ${x}`)
          .join('\n')

        var done = count >= total

        var content = [result, done ? '' : ',', '\n', done ? ']\n' : ''].join(
          ''
        )

        rl.output.write(content, function () {
          if (done) {
            resolve({ count })
          }
        })
      }
    })
  })
}
