const test = require('brittle')
const { PassThrough } = require('streamx')
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
