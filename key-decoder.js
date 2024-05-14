/* eslint-disable no-control-regex */
const { Transform } = require('bare-stream')

const { constants: { ESC } } = require('.')

// https://en.wikipedia.org/wiki/ANSI_escape_code#Terminal_input_sequences

const metaKeyCode = /^(?:\x1b)([a-zA-Z0-9])$/
const functionKeyCode = /^(?:\x1b+)(O|N|\[|\[\[)(?:(\d+)(?:;(\d+))?([~^$])|(?:1;)?(\d+)?([a-zA-Z]))/

module.exports = class KeyDecoder extends Transform {
  constructor (opts = {}) {
    const {
      encoding = 'utf8'
    } = opts

    super({ mapWritable: mapWritable.bind(null, encoding) })

    this.encoding = encoding
  }

  _dataToKey (data) {
    let parts

    if (data === '\r') {
      return new Key('return')
    } else if (data === '\n') {
      return new Key('linefeed')
    } else if (data === '\t') {
      return new Key('tab')
    } else if (data === '\b' || data === ESC + '\b' || data === '\x7f' || data === ESC + '\x7f') {
      return new Key('backspace', { meta: data[0] === ESC })
    } else if (data === ESC || data === ESC + ESC) {
      return new Key('escape', { meta: data.length === 2 })
    } else if (data === ' ' || data === ESC + ' ') {
      return new Key('space', { meta: data.length === 2 })
    } else if (data <= '\x1a') {
      return new Key(data.charCodeAt(0) + 0x60, { ctrl: true })
    } else if (data.length === 1 && data >= 'a' && data <= 'z') {
      return new Key(data)
    } else if (data.length === 1 && data >= 'A' && data <= 'Z') {
      return new Key(data.toLowerCase(), { shift: true })
    } else if ((parts = metaKeyCode.exec(data))) {
      return new Key(parts[1].toLowerCase(), { meta: true, shift: /^[A-Z]$/.test(parts[1]) })
    } else if ((parts = functionKeyCode.exec(data))) {
      const code = (parts[1] || '') + (parts[2] || '') + (parts[4] || '') + (parts[6] || '')
      const modifier = (parts[3] || parts[5] || 1) - 1

      let name = 'undefined'

      const opts = {
        ctrl: (modifier & 4) !== 0,
        meta: (modifier & 10) !== 0,
        shift: (modifier & 1) !== 0
      }

      switch (code) {
        /* xterm/gnome ESC O letter */
        case 'OP': name = 'f1'; break
        case 'OQ': name = 'f2'; break
        case 'OR': name = 'f3'; break
        case 'OS': name = 'f4'; break

        /* xterm/rxvt ESC [ number ~ */
        case '[11~': name = 'f1'; break
        case '[12~': name = 'f2'; break
        case '[13~': name = 'f3'; break
        case '[14~': name = 'f4'; break

        /* from Cygwin and used in libuv */
        case '[[A': name = 'f1'; break
        case '[[B': name = 'f2'; break
        case '[[C': name = 'f3'; break
        case '[[D': name = 'f4'; break
        case '[[E': name = 'f5'; break

        /* common */
        case '[15~': name = 'f5'; break
        case '[17~': name = 'f6'; break
        case '[18~': name = 'f7'; break
        case '[19~': name = 'f8'; break
        case '[20~': name = 'f9'; break
        case '[21~': name = 'f10'; break
        case '[23~': name = 'f11'; break
        case '[24~': name = 'f12'; break

        /* xterm ESC [ letter */
        case '[A': name = 'up'; break
        case '[B': name = 'down'; break
        case '[C': name = 'right'; break
        case '[D': name = 'left'; break
        case '[E': name = 'clear'; break
        case '[F': name = 'end'; break
        case '[H': name = 'home'; break

        /* xterm/gnome ESC O letter */
        case 'OA': name = 'up'; break
        case 'OB': name = 'down'; break
        case 'OC': name = 'right'; break
        case 'OD': name = 'left'; break
        case 'OE': name = 'clear'; break
        case 'OF': name = 'end'; break
        case 'OH': name = 'home'; break

        /* xterm/rxvt ESC [ number ~ */
        case '[1~': name = 'home'; break
        case '[2~': name = 'insert'; break
        case '[3~': name = 'delete'; break
        case '[4~': name = 'end'; break
        case '[5~': name = 'pageup'; break
        case '[6~': name = 'pagedown'; break

        /* putty */
        case '[[5~': name = 'pageup'; break
        case '[[6~': name = 'pagedown'; break

        /* rxvt */
        case '[7~': name = 'home'; break
        case '[8~': name = 'end'; break

        /* rxvt keys with modifiers */
        case '[a': name = 'up'; opts.shift = true; break
        case '[b': name = 'down'; opts.shift = true; break
        case '[c': name = 'right'; opts.shift = true; break
        case '[d': name = 'left'; opts.shift = true; break
        case '[e': name = 'clear'; opts.shift = true; break

        case '[2$': name = 'insert'; opts.shift = true; break
        case '[3$': name = 'delete'; opts.shift = true; break
        case '[5$': name = 'pageup'; opts.shift = true; break
        case '[6$': name = 'pagedown'; opts.shift = true; break
        case '[7$': name = 'home'; opts.shift = true; break
        case '[8$': name = 'end'; opts.shift = true; break

        case 'Oa': name = 'up'; opts.ctrl = true; break
        case 'Ob': name = 'down'; opts.ctrl = true; break
        case 'Oc': name = 'right'; opts.ctrl = true; break
        case 'Od': name = 'left'; opts.ctrl = true; break
        case 'Oe': name = 'clear'; opts.ctrl = true; break

        case '[2^': name = 'insert'; opts.ctrl = true; break
        case '[3^': name = 'delete'; opts.ctrl = true; break
        case '[5^': name = 'pageup'; opts.ctrl = true; break
        case '[6^': name = 'pagedown'; opts.ctrl = true; break
        case '[7^': name = 'home'; opts.ctrl = true; break
        case '[8^': name = 'end'; opts.ctrl = true; break

        /* misc. */
        case '[Z': name = 'tab'; opts.shift = true; break
      }

      return new Key(name, opts)
    }
  }

  _transform (data, cb) {
    const key = this._dataToKey(data)
    if (key) {
      this.push(key)
    } else {
      for (const name of data) {
        if (name) this.push(this._dataToKey(name) ?? new Key(name))
      }
    }

    cb(null)
  }
}

class Key {
  constructor (name, opts = {}) {
    const {
      ctrl = false,
      meta = false,
      shift = false
    } = opts

    this.name = typeof name === 'number' ? String.fromCharCode(name) : name
    this.ctrl = ctrl
    this.meta = meta
    this.shift = shift
  }
}

function mapWritable (encoding, data) {
  if (Buffer.isBuffer(data)) {
    if (data[0] > 127 && data.length === 1) {
      data[0] -= 128
      data = ESC + data.toString(encoding)
    } else {
      data = data.toString(encoding)
    }
  }

  return data
}
