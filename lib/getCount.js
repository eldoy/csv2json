var exec = require('child_process').exec

module.exports = function getCount(input) {
  var command = `sed '/^$/d' ${input} | awk '{print NR}' | sort -nr | sed -n '1p'`
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
