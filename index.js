const fs = require('fs')
const readline = require('readline')
const exec = require('child_process').exec

// Get line count
function getCount(input) {
  const command = `sed '/^$/d' ${input} | awk '{print NR}' | sort -nr | sed -n '1p'`
  return new Promise(function (resolve, reject) {
    exec(command, function (err, count) {
      if (err) {
        reject(err)
      } else {
        resolve(parseInt(count.trim()))
      }
    })
  })
}

module.exports = async function (input, output) {
  if (!output) {
    output = input.replace(/\.csv$/, '.json')
  }
  let fields,
    total,
    count = 0
  try {
    total = await getCount(input)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }

  return new Promise(function (resolve) {
    const rl = readline.createInterface({
      input: fs.createReadStream(input),
      output: fs.createWriteStream(output)
    })

    rl.on('line', function (line) {
      if (!line.trim()) return
      count++
      const values = line.split(';').map((x) => x.trim())
      if (!fields) {
        rl.output.write(`[\n`)
        fields = values
      } else {
        const item = {}
        for (let i = 0; i < fields.length; i++) {
          item[fields[i]] = values[i]
        }
        const result = JSON.stringify(item, null, 2)
          .split('\n')
          .map((x) => `  ${x}`)
          .join('\n')

        const done = count >= total

        const content = [result, done ? '' : ',', '\n', done ? ']\n' : ''].join(
          ''
        )

        rl.output.write(content, function () {
          if (done) {
            resolve({ count })
          }
        })
      }
    })

    rl.on('close', function () {
      console.log(`Created "${rl.output.path}"`)
    })
  })
}
