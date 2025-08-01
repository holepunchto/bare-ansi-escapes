const test = require('brittle')
const { PassThrough } = require('bare-stream')
const { stylize } = require('.')
const KeyDecoder = require('./lib/key-decoder')

test('key decoder, plain character', (t) => {
  t.plan(4)

  const stream = new PassThrough()

  stream
    .pipe(new KeyDecoder())
    .on('data', (key) => {
      t.is(key.name, 'a')
      t.absent(key.ctrl)
      t.absent(key.meta)
      t.absent(key.shift)
    })
    .write('a')
})

test('key decoder, numeric character', (t) => {
  t.plan(4)

  const stream = new PassThrough()

  stream
    .pipe(new KeyDecoder())
    .on('data', (key) => {
      t.is(key.name, '1')
      t.absent(key.ctrl)
      t.absent(key.meta)
      t.absent(key.shift)
    })
    .write('1')
})

test('key decoder, non-alphanumeric', (t) => {
  t.plan(20)

  const stream = new PassThrough()

  const expected = ['-', ';', '$', '^', '[']

  let i = 0

  stream
    .pipe(new KeyDecoder())
    .on('data', (key) => {
      t.is(key.name, expected[i++])
      t.absent(key.ctrl)
      t.absent(key.meta)
      t.absent(key.shift)
    })
    .write('-;$^[')
})

test('key decoder, diaeresis', (t) => {
  t.plan(4)

  const stream = new PassThrough()

  const expected = ['ë']

  let i = 0

  stream
    .pipe(new KeyDecoder())
    .on('data', (key) => {
      t.is(key.name, expected[i++])
      t.absent(key.ctrl)
      t.absent(key.meta)
      t.absent(key.shift)
    })
    .write('\u00eb')
})

test('key decoder, 1 wide emoji', (t) => {
  t.plan(4)

  const stream = new PassThrough()

  stream
    .pipe(new KeyDecoder())
    .on('data', (key) => {
      t.is(key.name, '🍐')
      t.absent(key.ctrl)
      t.absent(key.meta)
      t.absent(key.shift)
    })
    .write('🍐')
})

test('key decoder, ctrl + c', (t) => {
  t.plan(4)

  const stream = new PassThrough()

  stream
    .pipe(new KeyDecoder())
    .on('data', (key) => {
      t.is(key.name, 'c')
      t.ok(key.ctrl)
      t.absent(key.meta)
      t.absent(key.shift)
    })
    .write('\x03')
})

test('key decoder, single esc', (t) => {
  t.plan(4)

  const stream = new PassThrough()

  stream
    .pipe(new KeyDecoder())
    .on('data', (key) => {
      t.is(key.name, 'escape')
      t.absent(key.ctrl)
      t.ok(key.meta)
      t.absent(key.shift)
    })
    .write('\x1b')
})

test('key decoder, double esc', (t) => {
  t.plan(4)

  const stream = new PassThrough()

  stream
    .pipe(new KeyDecoder())
    .on('data', (key) => {
      t.is(key.name, 'escape')
      t.absent(key.ctrl)
      t.ok(key.meta)
      t.absent(key.shift)
    })
    .write('\x1b\x1b')
})

test('key decoder, meta alphanumeric lowercase', (t) => {
  t.plan(4)

  const stream = new PassThrough()

  stream
    .pipe(new KeyDecoder())
    .on('data', (key) => {
      t.is(key.name, 'b')
      t.absent(key.ctrl)
      t.ok(key.meta)
      t.absent(key.shift)
    })
    .write('\x1bb')
})

test('key decoder, meta alphanumeric uppercase', (t) => {
  t.plan(4)

  const stream = new PassThrough()

  stream
    .pipe(new KeyDecoder())
    .on('data', (key) => {
      t.is(key.name, 'f')
      t.absent(key.ctrl)
      t.ok(key.meta)
      t.ok(key.shift)
    })
    .write('\x1bF')
})

test('key decoder, backspace', (t) => {
  t.plan(8)

  const stream = new PassThrough()

  stream.pipe(new KeyDecoder()).on('data', (key) => {
    t.is(key.name, 'backspace')
    t.absent(key.ctrl)
    t.absent(key.meta)
    t.absent(key.shift)
  })
  stream.write('\b')
  stream.write('\x7f')
})

test('key decoder, backspace with meta prefix', (t) => {
  t.plan(8)

  const stream = new PassThrough()

  stream.pipe(new KeyDecoder()).on('data', (key) => {
    t.is(key.name, 'backspace')
    t.absent(key.ctrl)
    t.ok(key.meta)
    t.absent(key.shift)
  })
  stream.write('\x1b\b')
  stream.write('\x1b\x7f')
})

test('key decoder, space', (t) => {
  t.plan(4)

  const stream = new PassThrough()

  stream
    .pipe(new KeyDecoder())
    .on('data', (key) => {
      t.is(key.name, 'space')
      t.absent(key.ctrl)
      t.absent(key.meta)
      t.absent(key.shift)
    })
    .write(' ')
})

test('key decoder, space with meta prefix', (t) => {
  t.plan(4)

  const stream = new PassThrough()

  stream
    .pipe(new KeyDecoder())
    .on('data', (key) => {
      t.is(key.name, 'space')
      t.absent(key.ctrl)
      t.ok(key.meta)
      t.absent(key.shift)
    })
    .write('\x1b ')
})

test('key decoder, linefeed', (t) => {
  t.plan(4)

  const stream = new PassThrough()

  stream
    .pipe(new KeyDecoder())
    .on('data', (key) => {
      t.is(key.name, 'linefeed')
      t.absent(key.ctrl)
      t.absent(key.meta)
      t.absent(key.shift)
    })
    .write('\x0a')
})

test('key decoder, multiple characters', (t) => {
  t.plan(12)

  const stream = new PassThrough()

  const expected = ['a', 'b', 'linefeed']

  let i = 0

  stream
    .pipe(new KeyDecoder())
    .on('data', (key) => {
      t.is(key.name, expected[i++])
      t.absent(key.ctrl)
      t.absent(key.meta)
      t.absent(key.shift)
    })
    .write('ab\x0a')
})

test("key decoder, esc before non escapable char isn't emitted", (t) => {
  t.plan(8)

  const stream = new PassThrough()

  const expected = ['tab', 'escape']

  let i = 0

  stream
    .pipe(new KeyDecoder())
    .on('data', (key) => {
      t.is(key.name, expected[i++])
      t.absent(key.ctrl)
      t.ok(key.meta)
      t.absent(key.shift)
    })
    .write('\x1b\t\x1b')
})

test('stylize', (t) => {
  t.is(stylize.bold('hello'), '\x1B[1mhello\x1B[0m', 'basic')

  t.is(
    stylize.underline(stylize.green('hello')),
    '\x1B[4m\x1B[32mhello\x1B[0m\x1B[0m',
    'multiple'
  )
})
