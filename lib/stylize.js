const ansiEscapes = require('..')

class Stylizer {
  constructor() {
    let methodName

    for (const escape of Object.getOwnPropertyNames(ansiEscapes)) {
      if (escape.startsWith('color')) {
        methodName = escape[5].toLowerCase() + escape.slice(6)
      } else if (escape.startsWith('modifier')) {
        methodName = escape[8].toLowerCase() + escape.slice(9)
      } else {
        continue
      }

      this[methodName] = (value) => this._apply(escape, value)
    }
  }

  _apply(escape, value) {
    return ansiEscapes[escape] + value + ansiEscapes.modifierReset
  }
}

module.exports = new Stylizer()
