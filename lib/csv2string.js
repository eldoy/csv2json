module.exports = function (value) {
  if (value == null || value == '') {
    return ''
  }

  if (!isNaN(value)) {
    return Number(value)
  }

  if (['true', 'false'].includes(value)) {
    return JSON.parse(value)
  }

  var result = String(value)

  if (result.startsWith('"') && result.endsWith('"')) {
    result = result.slice(1, -1)
  }

  return result
}
