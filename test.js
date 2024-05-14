const test = require('brittle')
const { PassThrough } = require('bare-stream')
const KeyDecoder = require('./key-decoder')

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

  const expectedNames = ['a', 'b', 'linefeed']
  let expectedNameIndex = 0

  stream
    .pipe(new KeyDecoder())
    .on('data', (key) => {
      t.is(key.name, expectedNames[expectedNameIndex])
      expectedNameIndex++
      t.absent(key.ctrl)
      t.absent(key.meta)
      t.absent(key.shift)
    })
    .write('ab\x0a')
})
